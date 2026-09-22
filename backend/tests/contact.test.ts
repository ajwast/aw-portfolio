import request from "supertest";

// Mock the Resend library before importing app
const mockSend = jest.fn();
jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })),
  };
});

import app from "../src/server";

describe("Contact Controller API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/status", () => {
    it("should return 200 OK and server status", async () => {
      const response = await request(app).get("/api/status");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "Server Running" });
    });
  });

  describe("POST /api/contact", () => {
    it("should return 400 Bad Request if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({ name: "John Doe", email: "john@example.com" }); // missing message

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        error: "Missing required fields",
      });
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("should return 200 OK and send email when valid data is provided", async () => {
      mockSend.mockResolvedValueOnce({
        data: { id: "msg_12345" },
        error: null,
      });

      const contactPayload = {
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello, I would like to get in touch!",
      };

      const response = await request(app)
        .post("/api/contact")
        .send(contactPayload);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Email sent successfully!",
        success: true,
      });
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "Contact Form from jane@example.com",
          text: expect.stringContaining("Jane Doe"),
          replyTo: "jane@example.com",
        })
      );
    });

    it("should return 500 Internal Server Error if Resend fails to send email", async () => {
      mockSend.mockResolvedValueOnce({
        data: null,
        error: { message: "API key invalid" },
      });

      const contactPayload = {
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello!",
      };

      const response = await request(app)
        .post("/api/contact")
        .send(contactPayload);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Email not sent successfully",
      });
    });
  });
});
