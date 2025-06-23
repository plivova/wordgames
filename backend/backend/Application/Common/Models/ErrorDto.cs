// // Created by Kateřina Plívová on 23.06.2025.

using System.Net;

namespace backend.Application.Common.Models;

public class ErrorDto
{
    public string Message { get; set; }
    public HttpStatusCode HttpStatusCode { get; set; }
}