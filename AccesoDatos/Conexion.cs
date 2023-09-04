using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace AccesoDatos
{
    public class Conexion 
    {
        public static SqlConnection conexion;
        public static bool Conectar()
        {
            //SqlConnection con = new SqlConnection("");
            try
            {
                if (conexion != null && conexion.State == System.Data.ConnectionState.Open) return true;

                conexion = new SqlConnection();
                //conexion.ConnectionString = "server=localhost;uid=root;pwd=root;database=northwind";
                //conexion.ConnectionString = "server=192.168.137.1;uid=sa;pwd=123;database=mydbema";
                conexion.ConnectionString = "User ID=sa;Password=123;Initial Catalog=mybdema;Server=192.168.137.1";
                conexion.Open();

                /*

                string sqlQuery = "SELECT * FROM Customers";
                SqlCommand command = new SqlCommand(sqlQuery, conexion);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Console.WriteLine($"CustomerID: {reader["CustomerID"]}, CustomerName: {reader["CustomerName"]}");
                }

                reader.Close();
                */

                return true;
            }
            catch (SqlException ex)
            {

                return false;
            }
            catch (Exception ex)
            {

                return false;
            }
            

        }

        public static void Desconectar()
        {
            if (conexion != null && conexion.State == System.Data.ConnectionState.Open)
                conexion.Close();

        }



    }

}