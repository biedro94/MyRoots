using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyRoots.Startup))]
namespace MyRoots
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
