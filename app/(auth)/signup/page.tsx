"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerSchema } from "@/schemas/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("")
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    setError("")
    console.log(values);
    try {
      const response = await axios.post('/api/register', values);
      if (response.status < 400) {
        setIsLoading(false);
        form.reset()
      } else {
        setError("User already exist");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
    
    
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen  dark:bg-gray-900">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="flex-col items-center justify-center text-center">
          <CardTitle className="text-2xl font-bold">Pulse Node</CardTitle>
          <CardDescription className="text-gray-500">
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <span className="text-sm text-red-600 flex items-center justify-center">{error}</span>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe"
                        aria-label="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        aria-label="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="johndoe@1219"
                        aria-label="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <span className="text-gray-500">Already have an account?</span>
          <Link href="/login" className="text-sky-500 hover:underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
