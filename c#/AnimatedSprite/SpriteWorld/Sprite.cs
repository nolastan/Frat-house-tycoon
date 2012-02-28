using System;
using System.Drawing;
using System.Windows.Forms;

namespace SpriteWorld
{
	/// <summary>
	/// 
	/// </summary>
	//class by Sasha Djurovic, djurovic@nyc.rr.com
	public class Sprite
	{
		public string Name;
		public Sprite(SpriteCanvas.Canvas canvas)
		{
			oCanvas=canvas;
			oSize=canvas.SpriteSize;
			oFrameRange=new Point(0,canvas.NumberOfFrames-1);
			oFrame=0;
		}
		public SpriteCanvas.Canvas oCanvas;
		private Point pPosition=new Point(0,0);
		private double pScale=1.0;
		private Point pFrameRange=new Point(0,59);
		private int pFrame=0;
		public bool oAnimated=false;
		public int oZorder=0;
		public Size oSize=new Size(64,64);
		public Image oImage=null;
		public Rectangle oSourceRect=new Rectangle(0,0,64,64);
		public Rectangle oDestRect=new Rectangle(0,0,64,64);
		public long oTimeStamp=0;
		public int oFPS=30;

		public int oFrame
		{
			get
			{
				return pFrame;
			}
			set
			{
				value=value%oCanvas.NumberOfFrames;
				if(value>oFrameRange.Y)
					value=oFrameRange.X-1+(value-oFrameRange.Y);
				if(value<oFrameRange.X)
					value=oFrameRange.Y-1-(value-oFrameRange.X);
				pFrame=value;
				//we validate once and store it in temp variables
				Point layout=oCanvas.ImageLayout;
				Size sSize=oCanvas.SpriteSize;
				//for use here
				oSourceRect=new Rectangle((pFrame%layout.X)*sSize.Width,
					Convert.ToInt32(pFrame/layout.X)*sSize.Height,
					sSize.Width,sSize.Height);
			}
		}
		public Point oFrameRange
		{
			get
			{
				return pFrameRange;
			}
			set
			{
				if(value.X>-1 && value.X<oCanvas.NumberOfFrames &&
					value.Y>-1 && value.Y<oCanvas.NumberOfFrames)
				{
					pFrameRange=value;
					oFrame=pFrameRange.X;
				}
				else
				{
					pFrameRange=new Point(0,oCanvas.NumberOfFrames-1);
					oFrame=pFrameRange.X;
				}
			}
		}

		public double oScale
		{
			get
			{
				return pScale;
			}
			set
			{
				pScale=value;
				oSize=new Size(Convert.ToInt32(oCanvas.SpriteSize.Width*pScale),Convert.ToInt32(oCanvas.SpriteSize.Height*pScale));
				oDestRect=new Rectangle(pPosition.X,pPosition.Y,oSize.Width,oSize.Height);
			}
		}

		public Point oPosition
		{
			get
			{
				return pPosition;
			}
			set
			{
				pPosition=value;
				oDestRect=new Rectangle(pPosition.X,pPosition.Y,oSize.Width,oSize.Height);
			}
		}
		public bool MoveAnimation()
		{
			long elapsed=DateTime.Now.Ticks-oTimeStamp;
			if(oTimeStamp==0)//if we are just starting animation
			{
				oFrame=oFrameRange.X;
				oTimeStamp=elapsed;
				return false;
			}
			//in ms
			int frameDuration=Convert.ToInt32(1000.0/oFPS);
			//100ns=10,000 ticks in 1 ms
			int frame=Convert.ToInt32(elapsed/10000/frameDuration);
			if (frame>0)
			{
				//looping done in frame validation so just add some frames
				oFrame=oFrame+frame;
				oTimeStamp=DateTime.Now.Ticks;
				return true;
			}
			return false;
		}
	}
}
