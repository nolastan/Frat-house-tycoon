
using System;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace PaintTest
{
	/// <summary>
	/// Summary description for DrawObject.
	/// </summary>
	public class DrawObject
	{
		private	Rectangle	boundingRect;
		private	Point		dragPoint;
		private	bool		dragging;

		public bool IsDragging()
		{
			return dragging;
		}

		public DrawObject(int x, int y, int width, int height)
		{
			dragging		= false;
			boundingRect	= new Rectangle(x, y, width, height);	
		}

		public bool HitTest(Point pt)
		{
			return boundingRect.Contains(pt);			
		}

		public void Drag(Point pt, System.Windows.Forms.Panel wnd)
		{
			wnd.Invalidate(boundingRect, false);

			boundingRect.X = pt.X - dragPoint.X;
			boundingRect.Y = pt.Y - dragPoint.Y;

			wnd.Invalidate(boundingRect, false);
		}

		public void BeginDrag(Point pt)
		{
			dragPoint.X = pt.X - boundingRect.X;
			dragPoint.Y = pt.Y - boundingRect.Y;
			dragging = true;
		}

		public void EndDrag()
		{
			dragging = false;
		}

		public void Draw(Graphics g)
		{
			
			LinearGradientBrush myLinearGradientBrush = new LinearGradientBrush(
				boundingRect,
				Color.AliceBlue,
				Color.Silver,
				LinearGradientMode.Horizontal);

			g.FillRectangle(myLinearGradientBrush, boundingRect);

			
			Rectangle rc = boundingRect;
			rc.X--;
            rc.Y--;
            rc.Inflate(-1, -1);
            rc.Width++;
            rc.Height++;

            //Font font = new Font("Arial", 8);
            //StringFormat sf = new StringFormat();
            //sf.LineAlignment = StringAlignment.Center;
            //sf.Alignment = StringAlignment.Center;

            //g.DrawString("Click mouse and hold to drag", font, new SolidBrush(Color.Black), rc, sf);

			g.DrawRectangle(new Pen(SystemColors.Highlight), rc);
            //g.DrawRectangle(new Pen(SystemColors.Highlight), boundingRect);
		}
	}
}
