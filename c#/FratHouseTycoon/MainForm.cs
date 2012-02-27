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
	public class MainForm : System.Windows.Forms.Form
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		/// 

		private System.ComponentModel.Container components = null;
        private DBGraphics memGraphics;
        private Panel panel1;
        private Panel panel2;
        private Button button1;
		private	DrawObject drawObj1;
        private DrawObject drawObj2;
        LinearGradientBrush panel1BGbrush;
        LinearGradientBrush partyBGbrush;
        private Rectangle partyRect;
        Font font;
        StringFormat sf;

		public MainForm()
		{
            memGraphics = new DBGraphics();
			drawObj1	= new DrawObject(10, 10, 20, 20);
            drawObj2    = new DrawObject(35, 10, 20, 20);
            
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

            Application.EnableVisualStyles();

            panel1BGbrush = new LinearGradientBrush(panel1.ClientRectangle,
                                                    Color.AliceBlue,
                                                    Color.Silver,
                                                    LinearGradientMode.Vertical);
            
            Point centerPoint = new Point((int)Math.Truncate((double)(panel1.Width) / (double)2),
                                          (int)Math.Truncate((double)(panel1.Height - 80) / (double)2));
            partyRect = new Rectangle(0, 80, centerPoint.X, centerPoint.Y);

            partyBGbrush = new LinearGradientBrush(partyRect,
                                                   Color.SteelBlue,
                                                   Color.Tan,
                                                   LinearGradientMode.Vertical);

            font = new Font("Arial", 14, FontStyle.Underline);
            sf = new StringFormat();
            sf.LineAlignment = StringAlignment.Center;
            sf.Alignment = StringAlignment.Center;             

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
            this.panel1 = new System.Windows.Forms.Panel();
            this.panel2 = new System.Windows.Forms.Panel();
            this.button1 = new System.Windows.Forms.Button();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.Transparent;
            this.panel1.Location = new System.Drawing.Point(-1, -1);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(418, 503);
            this.panel1.TabIndex = 0;
            this.panel1.Paint += new System.Windows.Forms.PaintEventHandler(this.panel1_Paint);
            this.panel1.MouseDown += new System.Windows.Forms.MouseEventHandler(this.panel1_MouseDown);
            this.panel1.MouseMove += new System.Windows.Forms.MouseEventHandler(this.panel1_MouseMove);
            this.panel1.MouseUp += new System.Windows.Forms.MouseEventHandler(this.panel1_MouseUp);
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.Beige;
            this.panel2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.panel2.Controls.Add(this.button1);
            this.panel2.Location = new System.Drawing.Point(417, -2);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(402, 503);
            this.panel2.TabIndex = 1;
            // 
            // button1
            // 
            this.button1.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.Location = new System.Drawing.Point(19, 12);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(103, 32);
            this.button1.TabIndex = 0;
            this.button1.Text = "Run 1 Turn!";
            this.button1.UseCompatibleTextRendering = true;
            this.button1.UseVisualStyleBackColor = true;
            // 
            // MainForm
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
            this.ClientSize = new System.Drawing.Size(818, 502);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.Name = "MainForm";
            this.Text = "Frat House Tycoon";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.Resize += new System.EventHandler(this.Form1_Resize);
            this.panel2.ResumeLayout(false);
            this.ResumeLayout(false);

		}
		#endregion

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main() 
		{
			Application.Run(new MainForm());
		}

		private void Form1_Load(object sender, System.EventArgs e)
		{            
            memGraphics.CreateDoubleBuffer(panel1.CreateGraphics(),
                                           panel1.ClientRectangle.Width,
                                           panel1.ClientRectangle.Height);
		}
		
		private void Form1_Resize(object sender, System.EventArgs e)
		{			
			memGraphics.CreateDoubleBuffer(panel1.CreateGraphics(),
                                           panel1.ClientRectangle.Width,
                                           panel1.ClientRectangle.Height);
            Invalidate();	
		}	

        private void panel1_Paint(object sender, PaintEventArgs e)
        {
            if (memGraphics.CanDoubleBuffer())
            {
                // Fill in Background (for effieciency only the area that has been clipped)                
                memGraphics.g.FillRectangle(panel1BGbrush, 
                                            e.ClipRectangle.X, 
                                            e.ClipRectangle.Y, 
                                            e.ClipRectangle.Width, 
                                            e.ClipRectangle.Height);

                // Draw the Party quadrant
                memGraphics.g.FillRectangle(partyBGbrush,
                                            partyRect.X,
                                            partyRect.Y,
                                            partyRect.Width,
                                            partyRect.Height);
                memGraphics.g.DrawString("Party", font, new SolidBrush(Color.Black), partyRect, sf);

                // Draw the divider line at the top
                memGraphics.g.DrawLine(new Pen(SystemColors.Highlight), new Point(0, 80), new Point(panel1.Width, 80));

                // Draw the objects
                drawObj1.Draw(memGraphics.g);
                drawObj2.Draw(memGraphics.g);        
        


                // Render to the form
                memGraphics.Render(e.Graphics);
            }            
        }

        private void panel1_MouseDown(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left && drawObj1.HitTest(new Point(e.X, e.Y)))
            {
                panel1.Capture = true;
                drawObj1.BeginDrag(new Point(e.X, e.Y));                
            }

            if (e.Button == MouseButtons.Left && drawObj2.HitTest(new Point(e.X, e.Y)))
            {
                panel1.Capture = true;
                drawObj2.BeginDrag(new Point(e.X, e.Y));
            }
        }

        private void panel1_MouseMove(object sender, MouseEventArgs e)
        {
            if (drawObj1.IsDragging())
            {
                drawObj1.Drag(new Point(e.X, e.Y), panel1);                
            }

            if (drawObj2.IsDragging())
            {
                drawObj2.Drag(new Point(e.X, e.Y), panel1);
            }
        }

        private void panel1_MouseUp(object sender, MouseEventArgs e)
        {
            if (drawObj1.IsDragging())
            {
                drawObj1.EndDrag();                
            }

            if (drawObj2.IsDragging())
            {
                drawObj2.EndDrag();
            }
        }	
	}
}
