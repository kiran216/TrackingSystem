using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TrackingSystem.Models;
using System.Web.Optimization;
using Microsoft.ApplicationBlocks.Data;
using System.Data;
namespace TrackingSystem.DataAccessLayer
{
    public class SQLOperations : IMapsDataLayer
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
       /// <summary>
       /// Add location Details Of user
       /// </summary>
       /// <param name="location"></param>
       /// <returns> returns true ifdetails addede perfectly else false</returns>
        public bool AddLocationDetails(LocationDetails location)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();
               
                SqlCommand command = new SqlCommand("InsertTblLocation", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", location.Name);
                command.Parameters.AddWithValue("@Latitude", location.Latitude);
                command.Parameters.AddWithValue("@Longitude", location.Longitude);
                command.Parameters.AddWithValue("@Position", location.Position);
                command.ExecuteNonQuery();
                return true;
               

            }
            catch (Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return false;
            }
            finally
            {
                connection.Close();
            }
        }
        /// <summary>
        /// get user names as a list
        /// </summary>
        /// <returns></returns>
        public List<string> GetUserNames()
        {
            List<string> names = new List<string>();
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();

                SqlCommand command = new SqlCommand("GetAllNames", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    names.Add(reader["Name"].ToString());
                }
                return names;
            }
            catch (Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return null;
            }
            finally
            {
                connection.Close();
            }
        }

        /// <summary>
        /// get latest location details of user
        /// </summary>
        /// <param name="name"></param>
        /// <returns>location Details of particular user</returns>

        public List<LocationDetails> GetLatestDetails(string name)
        {
            List<LocationDetails> Details = new List<LocationDetails>();
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();

                SqlCommand command = new SqlCommand("GetLatestLocation", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", name);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Details.Add(new LocationDetails
                    {
                        Name = reader["Name"].ToString(),
                        Longitude = Convert.ToSingle(reader["Longitude"]),
                        Latitude = Convert.ToSingle(reader["Latitude"]),
                        UpdatedDate = Convert.ToDateTime(reader["DateofEntry"]),
                    });
                }
                return Details;
            }

            catch (Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return null;
            }
            finally
            {
                connection.Close();
            }
        }
        /// <summary>
        /// get all the user location details
        /// </summary>
        /// <returns></returns>
        public List<LocationDetails> GetAllLocationDetails()
        {
            List<LocationDetails> Details = new List<LocationDetails>();
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();

                SqlCommand command = new SqlCommand("GetAllLocationDetails", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Details.Add(new LocationDetails
                    {
                        Name = reader["Name"].ToString(),
                        Longitude = Convert.ToSingle(reader["Longitude"]),
                        Latitude = Convert.ToSingle(reader["Latitude"]),
                        UpdatedDate = Convert.ToDateTime(reader["DateofEntry"]),
                    });
                }
                return Details;
            }

            catch (Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return null;
            }
            finally
            {
                connection.Close();
            }
        }
        /// <summary>
        /// get all location details of particular user
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>

        public List<LocationDetails> GetAllLocations(string name)
        {
            List<LocationDetails> Details = new List<LocationDetails>();
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();

                SqlCommand command = new SqlCommand("GetAllLocations", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", name);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Details.Add(new LocationDetails
                    {
                        Name = reader["Name"].ToString(),
                        Longitude = Convert.ToSingle(reader["Longitude"]),
                        Latitude = Convert.ToSingle(reader["Latitude"]),
                        UpdatedDate = Convert.ToDateTime(reader["DateofEntry"]),
                        Position=Convert.ToInt16(reader["Position"]),
                    });
                }
                return Details;
            }

            catch (Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return null;
            }
            finally
            {
                connection.Close();
            }
        }
        /// <summary>
        /// adding new user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool AddNewUser(UserDetails user)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();
                SqlCommand command = new SqlCommand("InsertUserDetails", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", user.UserName);
                command.Parameters.AddWithValue("@password", user.PassWord);
                command.Parameters.AddWithValue("@Email", user.EmailID);
                command.Parameters.AddWithValue("@MobileNumber", user.MobileNumber);
                command.ExecuteNonQuery();
                return true;
            }
            catch
            { 
                return false; 
            }
            finally {
                connection.Close();
            }
        }
    }
    public class AccountDBOperations
    {
        public bool CheckCredentials(string UserName, string Password)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();
                SqlCommand command = new SqlCommand("CheckCredentials", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", UserName);
                command.Parameters.AddWithValue("@Password", Password);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}