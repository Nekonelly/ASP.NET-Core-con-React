﻿

namespace Modelo
{
    public class Category//internal class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }

        public Category(int categoryId, string categoryName, string description)
        {
            CategoryId = categoryId;
            CategoryName = categoryName;
            Description = description;
        }

        /*public override string ToString()
        {
            return CategoryName;
        }*/

    }
}
