using System;
using System.Collections;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Windows.Forms;

namespace SpriteCanvas
{
	//class by Sasha Djurovic, djurovic@nyc.rr.com
	public class Canvas : System.Windows.Forms.UserControl
	{
		private System.ComponentModel.IContainer components=null;

		public Canvas()
		{
			// This call is required by the Windows.Forms Form Designer.
			InitializeComponent();

		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if( components != null )
					components.Dispose();
			}
			base.Dispose( disposing );
		}
		private Point cLayout=new Point(10,6);
		private Image cPictureFile;
		private Size cSpriteSize=new Size(64,64);
		private int cNumberOfFrames=60;

		#region Component Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			// 
			// Canvas
			// 
			this.Name = "Canvas";

		}
		#endregion


		/// <summary>
		/// Source file for sprites
		/// </summary>
		public Image PictureFile
		{
			get
			{
				return cPictureFile;
			}
			set
			{
				cPictureFile=value;
				cSpriteSize=new Size(Convert.ToInt32(cPictureFile.Size.Width/cLayout.X),
					Convert.ToInt32(cPictureFile.Size.Height/cLayout.Y));
			}
		}
		/// <summary>
		/// layout of sprites in source image file
		/// </summary>
		public Point ImageLayout
		{
			get
			{
				return cLayout;
			}
			set
			{
				cLayout=value;
				if(cPictureFile!=null)
					cSpriteSize=new Size(Convert.ToInt32(cPictureFile.Size.Width/cLayout.X),
						Convert.ToInt32(cPictureFile.Size.Height/cLayout.Y));
				cNumberOfFrames=cLayout.X*cLayout.Y;
			}
		}

		public Size SpriteSize
		{
			get
			{
				return cSpriteSize;
			}
		}

		public int NumberOfFrames
		{
			get
			{
				return cNumberOfFrames;
			}
		}
	}
}
