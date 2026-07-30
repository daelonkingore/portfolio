import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Missing request body."
            })
        };
    }

    const data = JSON.parse(event.body);

    const email = data.email?.trim();
    const message = data.message?.trim();
    const botField = data["bot-field"]?.trim();

    //
    // Honeypot
    //
    if (botField) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Spam detected."
        })
      };
    }

    const submittedAt = Number(data.submittedAt);

    if (!submittedAt || Date.now() - submittedAt < 4000) {
    return {
        statusCode: 400,
        body: JSON.stringify({
        error: "Submitted too quickly."
        })
    };
    }

    //
    // Email validation
    //
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid email."
        })
      };
    }

    //
    // Message validation
    //
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Message is required."
        })
      };
    }

    if (message.length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Message too short."
        })
      };
    }

    if (message.length > 1000) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Message too long."
        })
      };
    }

    //
    // Reject messages that are only whitespace or symbols
    //
    const letters = message.replace(/[^A-Za-z]/g, "");

    if (letters.length < 8) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Message appears invalid."
        })
      };
    }

    // reject email with excessively long address
    if (email.length > 254) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Invalid email."
            })
        };
    }

    // reject invalid emails
    const localPart = email.split("@")[0];
    if (localPart.length < 2) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Invalid email."
            })
        };
    }

    // reject multiple consecutive spaces
    if (/\s{3,}/.test(message)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Invalid message."
            })
        };
    }

    // reject too many repeated characters
    if (/(.)\1{10,}/.test(message)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Invalid message."
            })
        };
    }

    // reject message with too many links
    const urlCount = (message.match(/https?:\/\/|www\./gi) || []).length;
    if (urlCount > 2) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Too many links."
            })
        };
    }

    // reject message with only punctuation
    const letterCount = (message.match(/[A-Za-z]/g) || []).length;
    if (letterCount / message.length < 0.2) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Message appears invalid."
            })
        };
    }

    // reject duplicate punctuation
    if (/([!?$#@%*])\1{5,}/.test(message)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Message appears invalid."
            })
        };
    }

    // reject message with too few characters
    const uniqueChars = new Set(message.toLowerCase()).size;
    if (uniqueChars < 8) {
        return {
            statusCode: 400,
            body: JSON.stringify({
            error: "Message appears invalid."
            })
        };
    }

    // verify content-Type
    const contentType = event.headers["content-type"] ?? event.headers["Content-Type"];
    if (!contentType?.includes("application/json")) {
    return {
        statusCode: 415,
        body: JSON.stringify({
        error: "Unsupported media type."
        })
    };
    }

    //
    // Forward to Netlify Forms
    //

    const params = new URLSearchParams({
      "form-name": "contact",
      email,
      message
    });

    const response = await fetch(
      `${process.env.URL}/`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },
        body: params.toString()
      }
    );

    if (!response.ok) {
      throw new Error("Unable to submit form");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error."
      })
    };
  }
}