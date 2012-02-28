using System;
using System.Drawing;

namespace SpriteWorld
{
	/// <summary>
	/// 
	/// </summary>
	 //class by Sasha Djurovic, djurovic@nyc.rr.com
	public class RectLibrary : System.Collections.CollectionBase
	{
		public RectLibrary()
		{
			
		}
		public Rectangle Item(int Index)
		{
				return (Rectangle) List[Index];
			
		}
		public void SetAt(int Index,Rectangle rect)
		{
			List.RemoveAt(Index);
			List.Insert(Index,rect);
			
		}

		public void Add(Rectangle rect)
		{
			List.Add(rect);
		}
		public void Remove(int index)
		{
			if (index > Count - 1 || index < 0)
				return;
			else
			{
				List.RemoveAt(index); 
			}
		}
	}
}
