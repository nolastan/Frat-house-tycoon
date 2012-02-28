using System;
using System.Drawing;
using System.Collections;

namespace SpriteWorld
{
	/// <summary>
	/// 
	/// </summary>
	//class by Sasha Djurovic, djurovic@nyc.rr.com
	public class SpriteLibrary : System.Collections.CollectionBase
	{
		public SpriteLibrary()
		{
		}
		public ArrayList SortedByZ=new ArrayList();

		public Sprite Item(int Index)
		{
			return (Sprite) List[Index];
		}	
		public void Add(Sprite sprite)
		{
			SortedByZ.Add(List.Count);
			List.Add(sprite);
		}
	}
}
