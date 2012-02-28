using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using SpriteWorld;

namespace TestApp
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private SpriteCanvas.Canvas canvas1;
		private System.Windows.Forms.Button button1;
		private System.Windows.Forms.Button button2;
		private System.Windows.Forms.TextBox textBox1;
		private System.Windows.Forms.HScrollBar ScaleScroll;
		private System.Windows.Forms.Timer timer;
		private System.Windows.Forms.TextBox textBox2;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox textBox3;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Timer FPStimer;
		private System.Windows.Forms.Label Frame;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.HScrollBar FPSScroll;
		private System.Windows.Forms.PictureBox Background;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.Timer AnimationTimer;
		private System.Windows.Forms.PictureBox View2;
		private System.Windows.Forms.Label label5;
		private System.Windows.Forms.Label label6;
		private System.ComponentModel.IContainer components;

		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();
			//create two viewports, one default size and origin
			myWorld.CreateViewport(pictureBox1,Background.Image);
			//... the other somewhat smaller and showing different portion of "world"
			myWorld.CreateViewport(View2,View2.CreateGraphics(),new Point(145,25),new Rectangle(30,30,120,120),Background.Image);
			//create some sprites
			CreateTestObjects();
			//main loop timer
			timer.Start();
			//animation loop timer
			AnimationTimer.Start();
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
		//create "world"
		public SpriteWorld.World myWorld=new SpriteWorld.World();
		public bool pMouseDrag=false;

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.components = new System.ComponentModel.Container();
			System.Resources.ResourceManager resources = new System.Resources.ResourceManager(typeof(Form1));
			this.canvas1 = new SpriteCanvas.Canvas();
			this.button1 = new System.Windows.Forms.Button();
			this.button2 = new System.Windows.Forms.Button();
			this.textBox1 = new System.Windows.Forms.TextBox();
			this.ScaleScroll = new System.Windows.Forms.HScrollBar();
			this.timer = new System.Windows.Forms.Timer(this.components);
			this.textBox2 = new System.Windows.Forms.TextBox();
			this.FPStimer = new System.Windows.Forms.Timer(this.components);
			this.label1 = new System.Windows.Forms.Label();
			this.textBox3 = new System.Windows.Forms.TextBox();
			this.label2 = new System.Windows.Forms.Label();
			this.FPSScroll = new System.Windows.Forms.HScrollBar();
			this.Frame = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.Background = new System.Windows.Forms.PictureBox();
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.AnimationTimer = new System.Windows.Forms.Timer(this.components);
			this.View2 = new System.Windows.Forms.PictureBox();
			this.label5 = new System.Windows.Forms.Label();
			this.label6 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// canvas1
			// 
			this.canvas1.BackColor = System.Drawing.SystemColors.GrayText;
			this.canvas1.ImageLayout = new System.Drawing.Point(10, 6);
			this.canvas1.Location = new System.Drawing.Point(192, 56);
			this.canvas1.Name = "canvas1";
			this.canvas1.PictureFile = ((System.Drawing.Bitmap)(resources.GetObject("canvas1.PictureFile")));
			this.canvas1.Size = new System.Drawing.Size(88, 64);
			this.canvas1.TabIndex = 3;
			this.canvas1.Visible = false;
			// 
			// button1
			// 
			this.button1.Location = new System.Drawing.Point(216, 280);
			this.button1.Name = "button1";
			this.button1.Size = new System.Drawing.Size(40, 24);
			this.button1.TabIndex = 5;
			this.button1.Text = "Next";
			this.button1.Click += new System.EventHandler(this.button1_Click);
			// 
			// button2
			// 
			this.button2.Location = new System.Drawing.Point(168, 280);
			this.button2.Name = "button2";
			this.button2.Size = new System.Drawing.Size(40, 24);
			this.button2.TabIndex = 6;
			this.button2.Text = "Prev";
			this.button2.Click += new System.EventHandler(this.button2_Click);
			// 
			// textBox1
			// 
			this.textBox1.Location = new System.Drawing.Point(168, 256);
			this.textBox1.Name = "textBox1";
			this.textBox1.Size = new System.Drawing.Size(24, 20);
			this.textBox1.TabIndex = 7;
			this.textBox1.Text = "";
			// 
			// ScaleScroll
			// 
			this.ScaleScroll.LargeChange = 20;
			this.ScaleScroll.Location = new System.Drawing.Point(48, 280);
			this.ScaleScroll.Maximum = 220;
			this.ScaleScroll.Minimum = 20;
			this.ScaleScroll.Name = "ScaleScroll";
			this.ScaleScroll.Size = new System.Drawing.Size(88, 24);
			this.ScaleScroll.TabIndex = 8;
			this.ScaleScroll.Value = 100;
			this.ScaleScroll.Scroll += new System.Windows.Forms.ScrollEventHandler(this.ScaleScroll_Scroll);
			// 
			// timer
			// 
			this.timer.Enabled = true;
			this.timer.Interval = 1;
			this.timer.Tick += new System.EventHandler(this.timer_Tick);
			// 
			// textBox2
			// 
			this.textBox2.Location = new System.Drawing.Point(392, 248);
			this.textBox2.Name = "textBox2";
			this.textBox2.Size = new System.Drawing.Size(32, 20);
			this.textBox2.TabIndex = 9;
			this.textBox2.Text = "";
			// 
			// FPStimer
			// 
			this.FPStimer.Enabled = true;
			this.FPStimer.Interval = 500;
			this.FPStimer.Tick += new System.EventHandler(this.FPStimer_Tick);
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(392, 232);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(48, 16);
			this.label1.TabIndex = 10;
			this.label1.Text = "CPU fps";
			// 
			// textBox3
			// 
			this.textBox3.Location = new System.Drawing.Point(448, 248);
			this.textBox3.Name = "textBox3";
			this.textBox3.Size = new System.Drawing.Size(32, 20);
			this.textBox3.TabIndex = 11;
			this.textBox3.Text = "";
			// 
			// label2
			// 
			this.label2.Location = new System.Drawing.Point(440, 232);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(56, 16);
			this.label2.TabIndex = 12;
			this.label2.Text = "Sprite fps";
			// 
			// FPSScroll
			// 
			this.FPSScroll.LargeChange = 30;
			this.FPSScroll.Location = new System.Drawing.Point(392, 296);
			this.FPSScroll.Maximum = 330;
			this.FPSScroll.Minimum = 1;
			this.FPSScroll.Name = "FPSScroll";
			this.FPSScroll.Size = new System.Drawing.Size(88, 24);
			this.FPSScroll.TabIndex = 13;
			this.FPSScroll.Value = 100;
			this.FPSScroll.Scroll += new System.Windows.Forms.ScrollEventHandler(this.FPSScroll_Scroll);
			// 
			// Frame
			// 
			this.Frame.Location = new System.Drawing.Point(200, 256);
			this.Frame.Name = "Frame";
			this.Frame.Size = new System.Drawing.Size(40, 16);
			this.Frame.TabIndex = 14;
			this.Frame.Text = "Frame";
			// 
			// label3
			// 
			this.label3.Location = new System.Drawing.Point(72, 256);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(40, 16);
			this.label3.TabIndex = 15;
			this.label3.Text = "Scale";
			// 
			// label4
			// 
			this.label4.Location = new System.Drawing.Point(384, 280);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(112, 16);
			this.label4.TabIndex = 16;
			this.label4.Text = "Sprite (apparent) fps";
			// 
			// Background
			// 
			this.Background.Image = ((System.Drawing.Bitmap)(resources.GetObject("Background.Image")));
			this.Background.Location = new System.Drawing.Point(32, 48);
			this.Background.Name = "Background";
			this.Background.Size = new System.Drawing.Size(104, 80);
			this.Background.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
			this.Background.TabIndex = 17;
			this.Background.TabStop = false;
			this.Background.Visible = false;
			// 
			// pictureBox1
			// 
			this.pictureBox1.BackColor = System.Drawing.SystemColors.Highlight;
			this.pictureBox1.Location = new System.Drawing.Point(16, 40);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(300, 180);
			this.pictureBox1.TabIndex = 18;
			this.pictureBox1.TabStop = false;
			this.pictureBox1.Paint += new System.Windows.Forms.PaintEventHandler(this.pictureBox1_Paint);
			this.pictureBox1.MouseMove += new System.Windows.Forms.MouseEventHandler(this.pictureBox1_MouseMove);
			this.pictureBox1.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pictureBox1_MouseDown);
			// 
			// AnimationTimer
			// 
			this.AnimationTimer.Enabled = true;
			this.AnimationTimer.Interval = 33;
			this.AnimationTimer.Tick += new System.EventHandler(this.AnimationTimer_Tick);
			// 
			// View2
			// 
			this.View2.BackColor = System.Drawing.SystemColors.ActiveCaption;
			this.View2.Location = new System.Drawing.Point(352, 40);
			this.View2.Name = "View2";
			this.View2.Size = new System.Drawing.Size(180, 180);
			this.View2.TabIndex = 19;
			this.View2.TabStop = false;
			this.View2.Paint += new System.Windows.Forms.PaintEventHandler(this.View2_Paint);
			// 
			// label5
			// 
			this.label5.Location = new System.Drawing.Point(128, 8);
			this.label5.Name = "label5";
			this.label5.Size = new System.Drawing.Size(64, 24);
			this.label5.TabIndex = 20;
			this.label5.Text = "Viewport 1";
			// 
			// label6
			// 
			this.label6.Location = new System.Drawing.Point(408, 8);
			this.label6.Name = "label6";
			this.label6.Size = new System.Drawing.Size(64, 16);
			this.label6.TabIndex = 21;
			this.label6.Text = "Viewport 2";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(544, 350);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.label6,
																		  this.label5,
																		  this.View2,
																		  this.Background,
																		  this.label4,
																		  this.Frame,
																		  this.FPSScroll,
																		  this.label2,
																		  this.textBox3,
																		  this.textBox2,
																		  this.ScaleScroll,
																		  this.textBox1,
																		  this.button2,
																		  this.button1,
																		  this.canvas1,
																		  this.label3,
																		  this.label1,
																		  this.pictureBox1});
			this.Name = "Form1";
			this.Text = "Form1";
			this.ResumeLayout(false);

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
		private void button1_Click(object sender, System.EventArgs e)
		{
			myWorld.Library.Item(2).oFrame++;
			myWorld.RequestRendering(2);
			myWorld.Library.Item(3).oFrame++;
			myWorld.RequestRendering(3);
			textBox1.Text=Convert.ToString(myWorld.Library.Item(2).oFrame);
		}

		private void button2_Click(object sender, System.EventArgs e)
		{
			myWorld.Library.Item(2).oFrame--;
			myWorld.RequestRendering(2);
			myWorld.Library.Item(3).oFrame--;
			myWorld.RequestRendering(3);
			textBox1.Text=Convert.ToString(myWorld.Library.Item(2).oFrame);
		
		}
		
		private void ScaleScroll_Scroll(object sender, System.Windows.Forms.ScrollEventArgs e)
		{
			myWorld.ResizeSprite(0,Convert.ToDouble(e.NewValue)/100.0);
		
		}

		private void CreateTestObjects()
		{
			//animated
			myWorld.AddSprite(canvas1,new Point(20,60),new Point(0,59),30,true);
			//also animated
			myWorld.AddSprite(canvas1,new Point(175,60),new Point(0,59),60,true);
			//static
			myWorld.AddSprite(canvas1,new Point(80,50));
			//static
			myWorld.AddSprite(canvas1,new Point(70,80));
			//start updating FPS monitor
			FPStimer.Start();
			//show some numbers
			textBox3.Text=Convert.ToString(myWorld.Library.Item(1).oFPS);
			textBox1.Text=Convert.ToString(myWorld.Library.Item(2).oFrame);
			
		}

		private void timer_Tick(object sender, System.EventArgs e)
		{
			//check if we need some rendering
			myWorld.RenderingLoop();
		}

		private void FPStimer_Tick(object sender, System.EventArgs e)
		{
			//show new FPS
			textBox2.Text=Convert.ToString(myWorld.GetFPS());
		}

		private void FPSScroll_Scroll(object sender, System.Windows.Forms.ScrollEventArgs e)
		{
			//we will adjust fps of sprite[1] with this
			myWorld.Library.Item(1).oFPS=e.NewValue;
			textBox3.Text=Convert.ToString(myWorld.Library.Item(1).oFPS);
		}

		private void pictureBox1_Paint(object sender, System.Windows.Forms.PaintEventArgs e)
		{
			//this is used only when we have some area that needs to be redrawn
			//like when we start, or min. then restore app, or bring it to front from behind
			//some other app
			myWorld.RePaint(sender,e.Graphics, e.ClipRectangle);
		
		}

		private void AnimationTimer_Tick(object sender, System.EventArgs e)
		{
			//we animate sprites here
			myWorld.UpdateAnimated();
		}

		private void View2_Paint(object sender, System.Windows.Forms.PaintEventArgs e)
		{
			// k, again when window needs to be repainted
			myWorld.RePaint(sender,e.Graphics, e.ClipRectangle);
		}

		private void pictureBox1_MouseDown(object sender, System.Windows.Forms.MouseEventArgs e)
		{
			//when we click mouse we will start dragging sprites underneath
			//when we click again we drop 'em
			if(pMouseDrag)
			{
				pMouseDrag=false;
				return;
			}
			myWorld.StartMouseDrag(e.X,e.Y);
			pMouseDrag=true;
		}

		private void pictureBox1_MouseMove(object sender, System.Windows.Forms.MouseEventArgs e)
		{
			//if we selected some sprites move 'em around
			if(pMouseDrag)
			{
				myWorld.MoveSelected(e.X,e.Y);
			}
		
		}

	}
}
