namespace Modelo
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }

        public String LastName { get; set; }

        public String Title { get; set; }

        public String FullName
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }
    }
}