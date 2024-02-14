using System.Web.Routing;

namespace Arkia.Events.LC2014.UI
{
    public class RoutingHelper
    {
        public RequestContext RequestContext { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="RoutingHelper"/> class.
        /// </summary>
        public RoutingHelper()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RoutingHelper"/> class.
        /// </summary>
        /// <param name="requestContext">The request context.</param>
        public RoutingHelper(RequestContext requestContext)
        {
            this.RequestContext = requestContext;
        }

        /// <summary>
        /// Gets a parameterized virtual path.
        /// </summary>
        /// <param name="values">The values.</param>
        /// <returns></returns>
        public string VirtualPath(object values)
        {
            return VirtualPath(null, values);
        }

        /// <summary>
        /// Gets a parameterized virtual path.
        /// </summary>
        /// <param name="routeName">The route name.</param>
        /// <param name="values">The values.</param>
        /// <returns></returns>
        public string VirtualPath(string routeName, object values)
        {
            return (RequestContext != null)
                ? RouteTable.Routes.GetVirtualPath(RequestContext, routeName, new RouteValueDictionary(values)).VirtualPath
                : null;
        }

        /// <summary>
        /// Returns an HTML anchor.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <returns></returns>
        public string ActionLink(string url)
        {
            return ActionLink(url, url);
        }

        /// <summary>
        /// Returns an HTML anchor.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public string ActionLink(string url, string text)
        {
            return string.Format("<a href=\"{0}\">{1}</a>", url, text);
        }

        /// <summary>
        /// Gets a route value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public object Value(string key)
        {
            return (RequestContext != null) ? RequestContext.RouteData.Values[key] : null;
        }



     
    }
}