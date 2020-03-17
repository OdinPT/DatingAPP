using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingappD3.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DatingappD3.API.Controllers
{
    //[Authorize]
    [Route("[controller]")]
    [ApiController]
    public class WeatherForecastController : ControllerBase
    {
        //equivalente a ValuesController
        private readonly DataContext _context;
        private readonly ILogger<WeatherForecastController> _logger;       
        //construtor
        public WeatherForecastController(ILogger<WeatherForecastController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();

            return Ok(values);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetValue(int id)
        {

            var value = await  _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value); 
        }

    }
}
