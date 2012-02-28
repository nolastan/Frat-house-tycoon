using System;
using System.Drawing;
using System.Collections;
using System.Windows.Forms;
using System.Threading;


namespace SpriteWorld
{
	/// <summary>
	/// Summary description for Class1.
	/// </summary>
	//class by Sasha Djurovic, djurovic@nyc.rr.com
	public class World
	{
		public World()
		{
			
		}
		
		public SpriteLibrary Library=new SpriteLibrary();//we have one library
		public ArrayList Viewport=new ArrayList();
		private ArrayList Selected=new ArrayList();
		private Point MouseDrag=new Point(0,0);//we need this for doing mouse dragging
		private int RenderCalls=0;
		private long pTime=0;
		private Thread renderThread;
		
		#region Viewports
		public void CreateViewport(object appObject,Graphics hdc,Point position, Rectangle area,Image background)
		{
			WorldView myViewport=new WorldView();
			myViewport.SetViewport(appObject,hdc,position,area,background,Library);
			Viewport.Add(myViewport);
		}
		public void CreateViewport(PictureBox box,Image background)
		{
			object appObject=box;
			Graphics hdc=box.CreateGraphics();
			Point position=new Point(0,0);
			Rectangle area=box.ClientRectangle;
			WorldView myViewport=new WorldView();
			myViewport.SetViewport(appObject,hdc,position,area,background,Library);
			Viewport.Add(myViewport);
		}
		public void RequestRendering(int sprite)
		{
			for(int count=0;count<Viewport.Count;count++)
				((WorldView)Viewport[count]).Request(sprite);
		}
		public void RequestErasure(int sprite)
		{
			for(int count=0;count<Viewport.Count;count++)
				((WorldView)Viewport[count]).Erase(sprite,Library.Item(sprite).oDestRect);
		}
		public void RenderingLoop()
		{
			//used to calculate FPS as a performance monitor
			if(RenderCalls==0)
				pTime=DateTime.Now.Ticks;
			RenderCalls++;
			for(int count=0;count<Viewport.Count;count++)
			{
				((WorldView)Viewport[count]).RenderingLoop();
			}
		}
		public void RePaint(object sender, Graphics graph,Rectangle clip)
		{
			for(int count=0;count<Viewport.Count;count++)
			{
				if(((WorldView)Viewport[count]).ViewObject==sender)
				{
					((WorldView)Viewport[count]).RenderAll(graph, clip);
					break;
				}
			}
		}
		#endregion
		
		#region Sprites
		public void AddSprite(SpriteCanvas.Canvas canvas)
		{
			Sprite sprite=new Sprite(canvas);
			sprite.oZorder=Library.Count;
			Library.Add(sprite);
		}
		public void AddSprite(SpriteCanvas.Canvas canvas,Point position)
		{
			Sprite sprite=new Sprite(canvas);
			sprite.oZorder=Library.Count;
			sprite.oPosition=position;
			Library.Add(sprite);
		}
		public void AddSprite(SpriteCanvas.Canvas canvas,Point position, Point frames, int fps, bool animated)
		{
			Sprite sprite=new Sprite(canvas);
			sprite.oZorder=Library.Count;
			sprite.oPosition=position;
			sprite.oFrameRange=frames;
			sprite.oAnimated=animated;
			sprite.oFPS=fps;
			Library.Add(sprite);
		}
		public void StartAnimation(int sprite)
		{
			Library.Item(sprite).oTimeStamp=DateTime.Now.Ticks;
			Library.Item(sprite).oAnimated=true;
		}
		public void StopAnimation(int sprite)
		{
			Library.Item(sprite).oAnimated=false;
			Library.Item(sprite).oTimeStamp=0;
		}
		public bool GetSelected(int x, int y)
		{
			Selected.Clear();
			//cycle through objects
			for(int count=0;count<Library.Count;count++)
			{
				if (Library.Item(count).oDestRect.X<x && Library.Item(count).oDestRect.Y<y &&
					Library.Item(count).oDestRect.X+Library.Item(count).oDestRect.Width>x &&
					Library.Item(count).oDestRect.Y+Library.Item(count).oDestRect.Height>y)
				{
					//yeah, this one is selected
					Selected.Add(count);
				}
			}
			if(Selected.Count==0)
				return false;
			else
				return true;
		}
		public void PutSelectedOnTop()
		{
			int top=Library.Count-1; //this is also a highest z index
			//search from top and find selected with highest z-order
			for(int count=top;count>=0;count--)
			{
				for(int index=0;index<Selected.Count;index++)
				{
					if(Library.Item((int)Selected[index]).oZorder==(int)Library.SortedByZ[count])//we found it
					{
						for(int down=count;down<top;down++)
						{
							Library.SortedByZ[down]=Library.SortedByZ[down+1];
						}
						Library.SortedByZ[top]=(int)Selected[index];
						//we put top, rest goes bellow
						top--;
						break;
					}
				}
			}
		}
		public void StartMouseDrag(int x, int y)
		{
			MouseDrag=new Point(x,y);
			GetSelected(x,y);
			PutSelectedOnTop();
		}
		public void MoveSelected(int x, int y)
		{
			Point Drag=new Point(x-MouseDrag.X,y-MouseDrag.Y);
			MouseDrag=new Point(x,y);
			for(int count=0;count<Selected.Count;count++)
			{
				RequestErasure((int)Selected[count]);
				Point move=new Point(Library.Item((int)Selected[count]).oPosition.X+Drag.X,
					Library.Item((int)Selected[count]).oPosition.Y+Drag.Y);
				Library.Item((int)Selected[count]).oPosition=move;
				RequestRendering((int)Selected[count]);
			}
		}
		public void UpdateAnimated()
		{
			for(int count=0;count<Library.Count;count++)
			{
				if(Library.Item(count).oAnimated)
				{
					if(Library.Item(count).MoveAnimation())
						RequestRendering(count);
				}
			}
		}
		public void ResizeSprite(int sprite, double scale)
		{
			RequestErasure(sprite);
			Library.Item(sprite).oScale=scale;
			RequestRendering(sprite);
		}
		#endregion
		
		#region Misc.
		//multithreading doesnt't work satisfactory
		//it's in here just if you want to try it
		public void ThreadLoop()
		{
			while (true)
			{
				//used to calculate FPS as a performance monitor
				if(RenderCalls==0)
					pTime=DateTime.Now.Ticks;
				RenderCalls++;
				for(int count=0;count<Viewport.Count;count++)
				{
					((WorldView)Viewport[count]).RenderingLoop();
				}
			}

		}
		public void StartRenderThread()
		{
			renderThread = new Thread(new ThreadStart(ThreadLoop));
			renderThread.Priority=ThreadPriority.Normal;
			renderThread.Start();

		}
		public void StopThread()
		{
			if(renderThread!=null)
				if(renderThread.IsAlive)
					renderThread.Abort();
		}
		public int GetFPS()
		{
			if(RenderCalls!=0 && DateTime.Now.Ticks!=pTime)
			{
				int result=Convert.ToInt32(10000000/((DateTime.Now.Ticks-pTime)/RenderCalls));
				RenderCalls=0;
				return result;
			}
			else return 0;
		}
		#endregion
	}
}
