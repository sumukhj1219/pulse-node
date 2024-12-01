"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("")
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setError(""); 
    try {
      const response = await axios.post('/api/login', values);
  
      if (response.status === 200) {
        setIsLoading(false);
      } else {
        setError("Couldn't find any user with these credentials.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="flex-col items-center justify-center text-center">
          <CardTitle className="text-2xl font-bold">Pulse Node</CardTitle>
          <CardDescription className="text-gray-500">Sign In</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <span className="text-sm text-red-600 flex items-center justify-center">{error}</span>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <span className="text-gray-500">New to PulseNode?</span>
          <Link href="/signup" className="text-sky-500 hover:underline">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
