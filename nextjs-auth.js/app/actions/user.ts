"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

import {
  ErrorResponse,
  ErrorResponseSchema,
  LoginRequest,
  LoginRequestSchema,
  LoginResponse,
  LoginResponseSchema,
  PasswordUpdateRequest,
  PasswordUpdateRequestSchema,
  PasswordUpdateResponse,
  PasswordUpdateResponseSchema,
  UpdateTokensRequest,
  UpdateTokensRequestSchema,
  UpdateUserRequest,
  UpdateUserRequestSchema,
  UserDeleteResponse,
  UserDeleteResponseSchema,
  UserResponse,
  UserResponseSchema,
  UserSignupRequest,
  UserSignupRequestSchema,
  UserSignupResponse,
  UserSignupResponseSchema,
} from "@/lib/schemas";

import { Result } from "@/lib/types";

export const signup = async (
  _prevState: Result<UserSignupResponse> | undefined,
  payload: UserSignupRequest,
): Promise<Result<UserSignupResponse>> => {
  try {
    const validationResult = UserSignupRequestSchema.safeParse(payload);

    if (!validationResult.success) {
      return {
        type: "error",
        message: validationResult.error.errors
          .map((err) => err.message)
          .join(", "),
        data: null,
      };
    }

    const response = await fetch(
      `${process.env.SERVICE_AUTH_URL}/api/v1/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      },
    );

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      const parsedError = ErrorResponseSchema.safeParse(errorData);

      return {
        type: "error",
        message: `${
          parsedError.success
        ? parsedError.data.detail instanceof Array
          ? parsedError.data.detail.map((e) => e.msg).join(", ")
          : parsedError.data.detail
        : "An unknown error occurred"
        }`,
        data: null,
      };
    }

    const responseData = await response.json();
    const parsedResponse = UserSignupResponseSchema.safeParse(responseData);

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
      message: "Successful registration",
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

export const login = async (
  _prevState: Result<LoginResponse> | undefined,
  payload: LoginRequest,
): Promise<Result<LoginResponse>> => {
  try {
    const validationResult = LoginRequestSchema.safeParse(payload);

    if (!validationResult.success) {
      return {
        type: "error",
        message: validationResult.error.errors
          .map((err) => err.message)
          .join(", "),
        data: null,
      };
    }

    const response = await fetch(
      `${process.env.SERVICE_AUTH_URL}/api/v1/login/access-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(validationResult.data as any).toString(),
      },
    );

    if (response.status === 400) {
      return {
        type: "error",
        message: "Invalid login credentials",
        data: null,
      };
    }
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      const parsedError = ErrorResponseSchema.safeParse(errorData);

      return {
        type: "error",
        message: `${
          parsedError.success
        ? parsedError.data.detail instanceof Array
          ? parsedError.data.detail.map((e) => e.msg).join(", ")
          : parsedError.data.detail
        : "An unknown error occurred"
        }`,
        data: null,
      };
    }

    const responseData = await response.json();
    const parsedResponse = LoginResponseSchema.safeParse(responseData);

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
      message: "Successful login",
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

export const signin = async (payload: LoginRequest) => {
  try {
    const result = await signIn("credentials", {
      email: payload.username,
      password: payload.password,
      redirect: false,
    });

    if (result.error) {
      throw new Error(result.error || "Unsuccessful login");
    }

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
            throw new Error("Invalid login credentials.");

        case "CallbackRouteError":
          throw error.cause?.err?.message;
        default:
          throw new Error("An error occurred: " + error.message);
      }
    }
    throw error;
  }
};

export const signout = async () => {
  await signOut();
};

export const getCurrentUser = async (
  accessToken: string,
): Promise<Result<UserResponse>> => {
  console.log("accessToken", accessToken);

  try {
    const response = await fetch(
      `${process.env.SERVICE_AUTH_URL}/api/v1/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      const parsedError = ErrorResponseSchema.safeParse(errorData);

      return {
        type: "error",
        message: `${
          parsedError.success
        ? parsedError.data.detail instanceof Array
          ? parsedError.data.detail.map((e) => e.msg).join(", ")
          : parsedError.data.detail
        : "An unknown error occurred"
        }`,
        data: null,
      };
    }

    const responseData = await response.json();
    const parsedResponse = UserResponseSchema.safeParse(responseData);

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
      message: "User read",
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

export const updatePassword = async (
  _prevState: Result<PasswordUpdateResponse> | undefined,
  payload: PasswordUpdateRequest,
): Promise<Result<PasswordUpdateResponse>> => {
  const session = await auth();

  if (!session?.user) {
    return {
      type: "error",
      message: "Invalid user credentials. Please log in to continue.",
      data: null,
    };
  }

  const accessToken = session.user.accessToken;

  const validationResult = PasswordUpdateRequestSchema.safeParse(payload);

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
      `${process.env.SERVICE_AUTH_URL}/api/v1/users/me/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
    const parsedResponse = PasswordUpdateResponseSchema.safeParse(responseData);

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
      message: "Password changed",
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

export const deleteUser = async (
  _prevState: Result<UserDeleteResponse> | undefined,
): Promise<Result<UserDeleteResponse>> => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Invalid user credentials. Please log in to continue.");
    }

    const accessToken = session.user.accessToken;

    const response = await fetch(
      `${process.env.SERVICE_AUTH_URL}/api/v1/users/${session?.user.id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
    const parsedResponse = UserDeleteResponseSchema.safeParse(responseData);

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
      message: "User deleted",
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

export const updateTokens = async (
  payload: UpdateTokensRequest,
): Promise<Result<UserResponse>> => {
  const session = await auth();

  if (!session?.user) {
    return {
      type: "error",
      message: "Invalid user credentials. Please log in to continue.",
      data: null,
    };
  }

  const accessToken = session.user.accessToken;

  const validationResult = UpdateTokensRequestSchema.safeParse(payload);

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
      `${process.env.SERVICE_AUTH_URL}/api/v1/users/me/tokens`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
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
    const parsedResponse = UserResponseSchema.safeParse(responseData);

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
      message: "Tokens updated successfully",
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

export const updateUser = async (
  _prevState: Result<UserResponse> | undefined,
  payload: UpdateUserRequest,
): Promise<Result<UserResponse>> => {
  const session = await auth();

  if (!session?.user) {
    return {
      type: "error",
      message: "Invalid user credentials. Please log in to continue.",
      data: null,
    };
  }

  const accessToken = session.user.accessToken;

  const validationResult = UpdateUserRequestSchema.safeParse(payload);

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
      `${process.env.SERVICE_AUTH_URL}/api/v1/users/me`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
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
    const parsedResponse = UserResponseSchema.safeParse(responseData);

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
      message: "Successfully saved",
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

