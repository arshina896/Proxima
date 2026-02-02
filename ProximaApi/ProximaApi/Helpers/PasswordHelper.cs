using System.Security.Cryptography;

namespace ProximaApi.Helpers
{
    public static class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            using var pbkdf2=new Rfc2898DeriveBytes(
                password,
                16,
                100000,
                HashAlgorithmName.SHA256
                );
            var salt =pbkdf2.Salt;
            var key = pbkdf2.GetBytes(32);
            return Convert.ToBase64String(salt)+"."+
                Convert.ToBase64String(key);
        }
        public static bool VerifyPassword(string password, string storedHash)
        {
            var parts=storedHash.Split('.');
            var salt=Convert.FromBase64String(parts[0]);
            var key =Convert.FromBase64String(parts[1]);
            using var pbkdf2 = new Rfc2898DeriveBytes(
                password, 
                salt,
                100000,
                HashAlgorithmName.SHA256
                );
            var newKey=pbkdf2.GetBytes(32);
            return CryptographicOperations.FixedTimeEquals(newKey, key);

        }
    }
}
