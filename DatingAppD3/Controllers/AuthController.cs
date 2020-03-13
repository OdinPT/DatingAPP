using DatingappD3.API.Data;
using DatingappD3.API.Dtos;
using DatingappD3.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingappD3.API.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        
       
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validade Request
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
                
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("username already exists");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createUSer = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }
         
       
    }
}
