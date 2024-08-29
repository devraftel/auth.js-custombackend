"use server";

import {
  ErrorResponseSchema,
  PasswordRecoveryResponse,
  PasswordRecoveryResponseSchema,
  ResetPasswordRequest,
  ResetPasswordRequestSchema,
  ResetPasswordResponse,
  ResetPasswordResponseSchema,
} from "@/lib/schemas";
import { Result } from "@/lib/types";

export const recoverPassword = async (
  _prevState: Result<PasswordRecoveryResponse> | undefined,
  email: string,
): Promise<Result<PasswordRecoveryResponse>> => {
  try {
    const response = await fetch(
      `${process.env.SERVICE_AUTH_URL}/api/v1/password-recovery/${email}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const parsedError = ErrorResponseSchema.safeParse(errorData);

      console.log("errorData: ", errorData);

      return {
        type: "error",
        message: parsedError.success
          ? parsedError.data.detail instanceof Array
            ? parsedError.data.detail.map((e) => e.msg).join(", ")
            : parsedError.data.detail
          : "An unknown error occurred",
        data: null,
      };
    }

    const responseData = await response.json();
    const parsedResponse =
      PasswordRecoveryResponseSchema.safeParse(responseData);

    console.log("parsedResponse: ", parsedResponse);

    if (!parsedResponse.success) {
      return {
        type: "error",
        message: parsedResponse.error.errors
          .map((err) => err.message)
          .join(", "),
        data: null,
      };
    }

    return {
      type: "success",
      message: "Email za pridobitev gesla je poslan.",
      data: parsedResponse.data,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
};

export const resetPassword = async (
  _prevState: Result<ResetPasswordResponse> | undefined,
  payload: ResetPasswordRequest,
): Promise<Result<ResetPasswordResponse>> => {
  // Validate request data
  const validationResult = ResetPasswordRequestSchema.safeParse(payload);

  if (!validationResult.success) {
    return {
      type: "error",
      message: validationResult.error.errors
        .map((err) => err.message)
        .join(", "),
      data: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.SERVICE_AUTH_URL}/api/v1/reset-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(validationResult.data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const parsedError = ErrorResponseSchema.safeParse(errorData);

      return {
        type: "error",
        message: parsedError.success
          ? parsedError.data.detail instanceof Array
            ? parsedError.data.detail.map((e) => e.msg).join(", ")
            : parsedError.data.detail
          : "An unknown error occurred",
        data: null,
      };
    }

    const responseData = await response.json();
    const parsedResponse = ResetPasswordResponseSchema.safeParse(responseData);

    if (!parsedResponse.success) {
      return {
        type: "error",
        message: parsedResponse.error.errors
          .map((err) => err.message)
          .join(", "),
        data: null,
      };
    }

    return {
      type: "success",
      message: "Geslo uspešno spremenjeno",
      data: parsedResponse.data,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
};
