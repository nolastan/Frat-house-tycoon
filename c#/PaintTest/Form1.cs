using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using GDIDB;

namespace PaintTest
{


	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		/// 

		private System.ComponentModel.Container components = null;
		private	  DBGraphics		memGraphics;
		private	  DrawObject		drawObj;

		public Form1()
		{	
			memGraphics = new DBGraphics();
			drawObj		= new DrawObject();
		
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}


		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(672, 502);
			this.Name = "Form1";
			this.Text = "Double Buffering Demostration";
			this.Resize += new System.EventHandler(this.Form1_Resize);
			this.MouseDown += new System.Windows.Forms.MouseEventHandler(this.Form1_MouseDown);
			this.Load += new System.EventHandler(this.Form1_Load);
			this.MouseUp += new System.Windows.Forms.MouseEventHandler(this.Form1_MouseUp);
			this.Paint += new System.Windows.Forms.PaintEventHandler(this.Form1_Paint);
			this.MouseMove += new System.Windows.Forms.MouseEventHandler(this.Form1_MouseMove);

		}
		#endregion

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main() 
		{
			Application.Run(new Form1());
		}

		private void Form1_Load(object sender, System.EventArgs e)
		{			
			memGraphics.CreateDoubleBuffer(this.CreateGraphics(), this.ClientRectangle.Width, this.ClientRectangle.Height);
		}

		protected override void OnPaintBackground(PaintEventArgs pevent)
		{
		}

		private void Form1_Resize(object sender, System.EventArgs e)
		{
			
			memGraphics.CreateDoubleBuffer(this.CreateGraphics(), this.ClientRectangle.Width, this.ClientRectangle.Height);
			Invalidate();
	
		}

		private void Form1_Paint(object sender, System.Windows.Forms.PaintEventArgs e)
		{
			if (memGraphics.CanDoubleBuffer())
			{
				
				// Fill in Background (for effieciency only the area that has been clipped)
				memGraphics.g.FillRectangle(new SolidBrush(SystemColors.Window), e.ClipRectangle.X,e.ClipRectangle.Y, e.ClipRectangle.Width, e.ClipRectangle.Height);
				
				// Draw the object
				drawObj.Draw(memGraphics.g);

				// Render to the form
				memGraphics.Render(e.Graphics);
			}
		}

		private void Form1_MouseDown(object sender, System.Windows.Forms.MouseEventArgs e)
		{
			if (e.Button == MouseButtons.Left && drawObj.HitTest(new Point(e.X, e.Y)))
			{
				this.Capture = true;
				drawObj.BeginDrag(new Point(e.X, e.Y));				
			}
		}

		private void Form1_MouseMove(object sender, System.Windows.Forms.MouseEventArgs e)
		{
			if (drawObj.IsDragging())
				drawObj.Drag(new Point(e.X, e.Y), this);
		
		}

		private void Form1_MouseUp(object sender, System.Windows.Forms.MouseEventArgs e)
		{
			if (drawObj.IsDragging())
				drawObj.EndDrag();
		
		}	
	}
}
