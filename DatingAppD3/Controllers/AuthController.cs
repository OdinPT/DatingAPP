using DatingappD3.API.Data;
using DatingappD3.API.Dtos;
using DatingappD3.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace DatingappD3.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public readonly IMapper _Mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _Mapper = mapper;
        }

        [HttpPost("register")]
        
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {       
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
                
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("username already exists");

            var userToCreate = _Mapper.Map<User>(userForRegisterDto);

            var createUSer = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _Mapper.Map<UserForDetailedDto>(createUSer);

            return CreatedAtRoute("GetUser", new {Controller = "Users", id = createUSer.Id}, userToReturn);
        }
         
        [HttpPost("login")]
        public async Task<IActionResult> Login (UserForLoginDto UserForLoginDto)
         {
             
            var userFromRepo = await _repo.Login(UserForLoginDto.Username.ToLower(), UserForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();
            var claims = new[]
            {
              new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
              new Claim (ClaimTypes.Name, userFromRepo.Username),
               
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var TokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(claims),
                 Expires = DateTime.Now.AddDays(1),
                 SigningCredentials = creds
             };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(TokenDescriptor);
            var user = _Mapper.Map<UserForListDto>(userFromRepo);
                 
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

    }
}
