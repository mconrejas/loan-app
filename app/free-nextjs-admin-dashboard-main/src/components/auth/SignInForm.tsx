"use client";
import React, { useState } from "react";
import { Button, TextField, IconButton, InputAdornment, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultUsername = "admin1";
    const defaultPassword = "user2025";
    if (username === defaultUsername && password === defaultPassword) {
      router.push("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4eacb5,rgba(26, 120, 243, 0.9),rgba(125, 51, 251, 0.91))",
        padding: 2,
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Link
  href="/"
  className="inline-flex items-center text-base text-gray-700 transition-colors 
  hover:text-blue-300 dark:text-gray-800 dark:hover:text-blue-400 absolute top-[calc(50%-250px)] 
  left-[calc(50%-250px)] transform -translate-x-1/2 hover:text-blue-300 hover:text-shadow hover:shadow-blue-900"
>
  <ChevronLeftIcon />
  Back to dashboard
</Link>


      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
          marginTop: 4,
        }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
            Sign In
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Enter your username and password to sign in!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <TextField
                label="Username"
                type="text"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: "6px 15px",
                  fontSize: "14px",
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  backgroundColor: "#0c6ef1",
                  color: "white",
                  marginLeft: "auto",
                  display: "block",
                  width: "auto",
                  "&:hover": {
                    backgroundColor: "#0c6ef1",
                    boxShadow: "0px 0px 12px 4px rgba(12, 110, 241, 0.8)",
                    textShadow:
                      "0 0 5px rgba(12, 110, 241, 0.8), 0 0 10px rgba(12, 110, 241, 0.8)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Box>
  );
}
