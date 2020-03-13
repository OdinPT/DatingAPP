﻿using DatingappD3.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingappD3.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);

        Task<User> login(string username, string password);

        Task<bool> UserExists(string username);
    }
}
