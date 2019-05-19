using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace MyApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            ModularStartup.Init(typeof(Startup), typeof(MyApp.ServiceInterface.MyServices).Assembly);
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<ModularStartup>()
                .Build();
    }
}
