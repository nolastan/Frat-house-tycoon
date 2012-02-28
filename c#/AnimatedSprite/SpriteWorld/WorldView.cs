using System;
using System.Drawing;
using System.Windows.Forms;
using System.Collections;



namespace SpriteWorld
{
	/// <summary>
	/// 
	/// </summary>
	//class by Sasha Djurovic, djurovic@nyc.rr.com
	public class WorldView
	{
		public WorldView()
		{

		}
		public object ViewObject;//used to identify Viewport parent
		private Point pOrigin;// viewport origin
		private Graphics pViewport;//dc to object where we draw
		private Rectangle pClientArea;//area where we draw
		private Image pBackBuffer;//back buffer ;)
		private Image pBackground;//background
		private SpriteLibrary pSprites;//need objects to draw?
		private ArrayList pRequestList=new ArrayList();//we will maintain this list as well 
		private bool pRequestBackground=false;//
		private int pClips=0;//number of clips, 0 means EACH sprite gets own clip
		private RectLibrary pClipRectangle=new RectLibrary();//list of rectangles that need to be erased
		


		#region Initializations and validations
		public void SetViewport(object appObject,Graphics viewport,Point position, Rectangle area,Image background,SpriteLibrary sprites)
		{
			ViewObject=appObject;
			pOrigin=position;
			pViewport=viewport;
			pClientArea=area;
			pBackBuffer=new Bitmap(area.Width, area.Height);
			pBackground=background;
			pSprites=sprites;
		}
		#endregion

		#region Requests for rendering and erasure
		//request rendering for all sprites
		public void RequestAll()
		{
			pRequestBackground=true;
			for(int count=0;count<pSprites.Count;count++)
			{
				pRequestList.Add(count);
			}
		}
		//request rendering for a particular sprite
		public bool Request(int index)
		{
			Rectangle source=new Rectangle(0,0,pClientArea.Width,pClientArea.Height);
			source.Offset(pOrigin.X,pOrigin.Y);
			//check if sprite within viewport
			if(source.IntersectsWith(pSprites.Item(index).oDestRect) ||
				source.Contains(pSprites.Item(index).oDestRect))
			{
				if(pRequestList.Contains(index))
					return false;
				pRequestList.Add(index);
				return true;
			}
			return false;
		}
		//remove request for sprite
		public void RemoveRequest(int index)
		{
			int RemIndex=pRequestList.IndexOf(index);
			if(RemIndex!=-1)
			{
				pRequestList.RemoveAt(RemIndex);
			}
		}
		//request erasing of a sprite
		public void Erase(int index,Rectangle rect)
		{
			Rectangle source=new Rectangle(0,0,pClientArea.Width,pClientArea.Height);
			source.Offset(pOrigin.X,pOrigin.Y);
			//check if sprite within viewport
			if(source.IntersectsWith(rect) || source.Contains(rect))
			{
				pClipRectangle.Add(rect);
				GetObjectsUnderneath(index);
			}
		}
		#endregion

		#region Rendering routines
		//renders complete scene
		public void RenderAll(Graphics clip,Rectangle area)
		{
			//adjust for origin
			Rectangle source=area;
			source.Offset(pOrigin);
			//get dc to bb
			Graphics back=Graphics.FromImage(pBackBuffer);
			//draw background if any
			if (pBackground!=null)
			{
				back.DrawImage(pBackground,area,source,GraphicsUnit.Pixel);
			}
			//draw objects
			for(int count=0;count<pSprites.Count;count++)
			{
				Rectangle dest=pSprites.Item((int)pSprites.SortedByZ[count]).oDestRect;
				dest.Offset(-pOrigin.X,-pOrigin.Y);
				back.DrawImage(pSprites.Item((int)pSprites.SortedByZ[count]).oCanvas.PictureFile,dest,
					pSprites.Item((int)pSprites.SortedByZ[count]).oSourceRect,GraphicsUnit.Pixel);
			}
			//clear it up
			pRequestList.Clear();
			pClipRectangle.Clear();
			//blt to front
			clip.DrawImage(pBackBuffer,pClientArea);
		}
		public void RenderEachClipped()
		{
			Graphics clip=pViewport;
			Rectangle area=pClientArea;
			//adjust for origin
			Rectangle source=area;
			source.Offset(pOrigin);
			//get dc to bb
			Graphics back=Graphics.FromImage(pBackBuffer);
			//draw background if any
			if (pBackground!=null && pRequestBackground)
			{
				back.DrawImage(pBackground,area,source,GraphicsUnit.Pixel);
			}
			//render erasure requests
			for(int count=0;count<pClipRectangle.Count;count++)
			{
					Rectangle dest=pClipRectangle.Item(count);
					dest.Offset(-pOrigin.X,-pOrigin.Y);
					back.DrawImage(pBackground,dest,
						new Rectangle(pClipRectangle.Item(count).X,
						pClipRectangle.Item(count).Y,
						pClipRectangle.Item(count).Width,
						pClipRectangle.Item(count).Height),GraphicsUnit.Pixel);
					//uncomment to see clips
					//back.DrawImage(pBackground,dest,new Rectangle(0,0,10,10),GraphicsUnit.Pixel);
			}
			//request objects that get drawn over
			for(int count=0;count<pRequestList.Count;count++)
			{
				GetObjectsUnderneath((int)pRequestList[count]);
			}
			for(int count=0;count<pSprites.Count;count++)
			{
				if(pRequestList.Contains((int)pSprites.SortedByZ[count]))
				{
					//draw clip for each sprite
					Rectangle dest=pSprites.Item((int)pSprites.SortedByZ[count]).oDestRect;
					source=dest;
					dest.Offset(-pOrigin.X,-pOrigin.Y);
					back.DrawImage(pBackground,dest,
						source,GraphicsUnit.Pixel);
					//uncomment to see clips
					//back.DrawImage(pBackground,dest,new Rectangle(0,0,10,10),GraphicsUnit.Pixel);
				}
			}
			for(int count=0;count<pSprites.Count;count++)
			{
				if(pRequestList.Contains((int)pSprites.SortedByZ[count]))
				{
					//draw objects
					Rectangle dest=pSprites.Item((int)pSprites.SortedByZ[count]).oDestRect;
					dest.Offset(-pOrigin.X,-pOrigin.Y);
					back.DrawImage(pSprites.Item((int)pSprites.SortedByZ[count]).oCanvas.PictureFile,dest,
						pSprites.Item((int)pSprites.SortedByZ[count]).oSourceRect,GraphicsUnit.Pixel);
				}
			}
			//clear it up
			pRequestList.Clear();
			pClipRectangle.Clear();
			//blt to front
			clip.DrawImage(pBackBuffer,pClientArea);
		}
		//renders only requested
		public void Render()
		{
			Rectangle dest=new Rectangle(0,0,pClientArea.Width,pClientArea.Height);
			Rectangle source=dest;
			source.Offset(pOrigin);
			//get dc to bb
			Graphics back=Graphics.FromImage(pBackBuffer);
			//draw background
			if(pBackground!=null)
				if(pRequestBackground)
				{
					back.DrawImage(pBackground,dest,source,GraphicsUnit.Pixel);
					pRequestBackground=false;
				}
				else
					//draw clipping regions background
				{					
					for(int count=0;count<pClipRectangle.Count;count++)
					{
						dest=pClipRectangle.Item(count);
						dest.Offset(-pOrigin.X,-pOrigin.Y);
						back.DrawImage(pBackground,dest,
							new Rectangle(pClipRectangle.Item(count).X,
							pClipRectangle.Item(count).Y,
							pClipRectangle.Item(count).Width,
							pClipRectangle.Item(count).Height),GraphicsUnit.Pixel);
						//uncomment bellow to see clip regions
						//also stop animation to see clips around static objects
						//back.DrawImage(pBackground,dest,new Rectangle(0,0,10,10),GraphicsUnit.Pixel);
					}
					
				}
			//draw objects
			for(int count=0;count<pSprites.Count;count++)
			{
				//start from bootom of z and work way up
				if(pRequestList.Contains((int)pSprites.SortedByZ[count]))
				{
					dest=pSprites.Item((int)pSprites.SortedByZ[count]).oDestRect;
					dest.Offset(-pOrigin.X,-pOrigin.Y);
					back.DrawImage(pSprites.Item((int)pSprites.SortedByZ[count]).oCanvas.PictureFile,
						dest,
						pSprites.Item((int)pSprites.SortedByZ[count]).oSourceRect,GraphicsUnit.Pixel);
				}
			}
			//clear em up
			pRequestList.Clear();
			pClipRectangle.Clear();
			//blt
			pViewport.DrawImage(pBackBuffer,pClientArea);
		
		}
		#endregion

		#region Main (rendering) loop
		public void RenderingLoop()
		{
			//did we have any request in a meantime?
			if(pRequestList.Count>0)
			{
				if(pClips>0)
				//create clip regions
				{
					CreateClips();
					Render();
				}
				else
					//use sprite as clip
					RenderEachClipped();
				
			}
		}
		#endregion

		#region Clips and such
		private Rectangle MergeClips(Rectangle clip1, Rectangle clip2)
		{
			int x,y,width,height;
			if(clip1.X<clip2.X)
				x=clip1.X;
			else
				x=clip2.X;
			if(clip1.X+clip1.Width>clip2.X+clip2.Width)
				width=clip1.X+clip1.Width-x;
			else
				width=clip2.X+clip2.Width-x;
			if(clip1.Y<clip2.Y)
				y=clip1.Y;
			else
				y=clip2.Y;
			if(clip1.Y+clip1.Height>clip2.Y+clip2.Height)
				height=clip1.Y+clip1.Height-y;
			else
				height=clip2.Y+clip2.Height-y;
			return new Rectangle(x,y,width,height);
		}
		private void CreateClips()
		{
			//each request has it's own clip rectangle, get them
			//on top of erase requests
			for(int count=0;count<pRequestList.Count;count++)
			{
				pClipRectangle.Add(pSprites.Item((int)pRequestList[count]).oDestRect);
				//get objects underneath
				GetObjectsUnderneath((int)pRequestList[count]);
			}
			GetNotRequested();
			//we'll be merging clips untill we get desired number of clips
			//for(int clipsCount=Total;clipsCount>pClips;clipsCount--)
			while(pClipRectangle.Count>pClips)
			{
				minArea=1000000;
				FindMinArea(pClipRectangle.Count-1);
				//use one on bottom
				pClipRectangle.SetAt(minIndexB,minRect);
				//don't use the one on top anymore
				pClipRectangle.Remove(minIndexA);
			}
			//ok, possibly we need to make some more requests 
			//for sprites covered with new clips and not req. originaly
			if(pRequestList.Count+NotRequested.Count!=pSprites.Count)
			
			{
				for(int count=0;count<pSprites.Count;count++)
				{
					Request(count);
				}
				for(int count=0;count<NotRequested.Count;count++)
				{
					RemoveRequest(count);
				}
			}			
		}
		private Rectangle minRect;//used for recursive FindMinArea()
		private int minArea;//same
		private int minIndexA;//yeah, same
		private int minIndexB;

		private void FindMinArea(int index)
		{
			for(int count=index-1;count>=0;count--)
			{
				Rectangle temp;
				temp=MergeClips(pClipRectangle.Item(index),pClipRectangle.Item(count));
				//check for objects underneath that didn't req rendering
				GetNotRequested();
				temp=MergeObjectsUnderneath(temp);

				int area=temp.Width*temp.Height;
				if(area<minArea)
				{
					minArea=area;
					minRect=temp;
					minIndexA=index;
					minIndexB=count;
				}
			}
			if(index>1)
				FindMinArea(index-1);
		}
		private void GetObjectsUnderneath(int index)
		{
			Rectangle RectA=pSprites.Item(index).oDestRect;
			for (int count=0;count<pSprites.Count;count++)
			{
				Rectangle RectB=pSprites.Item(count).oDestRect;
				if(Intersect(RectA,RectB))
					Request(count);
			}
		}
		private ArrayList NotRequested=new ArrayList();
		// we need it for later recursive MergeobjectsUnderneath
		private void GetNotRequested()
		{
			NotRequested.Clear();
			for (int count=0;count<pSprites.Count;count++)
			{
				if(!pRequestList.Contains(count))
				{
					NotRequested.Add(count);
				}
			}
		}
		private bool Intersect(Rectangle RectA,Rectangle RectB)
		{
			//check for intersecting rectangles
			if (RectA.IntersectsWith(RectB))
				return true;
			//check for contained (one inside the other)
			if(RectA.Contains(RectB)||RectB.Contains(RectA))
				return true;
			return false;
		}
		private Rectangle MergeObjectsUnderneath(Rectangle rect)
		{
			for (int count=0;count<NotRequested.Count;count++)
			{
				Rectangle RectB=pSprites.Item((int)NotRequested[count]).oDestRect;
				if(Intersect(RectB,rect))
				{
					NotRequested.RemoveAt(count);
					return MergeObjectsUnderneath(MergeClips(rect,RectB));
				}
			}
			return rect;
			
		}
		private bool PointInRectangle(Point point, Rectangle RectA)
		{
			for (int count=0;count<pSprites.Count;count++)
			{
				if(RectA.X<=point.X)
					if(RectA.X+RectA.Width>=point.X)
						if(RectA.Y<=point.Y)
							if(RectA.Y+RectA.Y+RectA.Height>=point.Y)
								return true;
			}
			return false;
		}
		#endregion
	}
}
