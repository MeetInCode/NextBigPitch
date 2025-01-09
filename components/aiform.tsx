"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generate } from "@/server/Ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  prompt: z.string().min(2).max(50),
});

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const result = await generate(values.prompt);
      setResult(result);
    } catch (error) {
      console.error(error);
      setResult("An error occurred while generating the pitch.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="max-w-3xl mx-auto shadow-md py-5 mt-5">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Create A Pitch using AI
          </CardTitle>
          <CardDescription className="text-center">
            <span className="font-semibold text-gray-600">Powered by</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text font-bold">
              gemini-1.5-pro-latest
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Your Business Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full min-h-[100px] p-4 text-sm rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary"
                        placeholder="Briefly explain what your company does, its motto, what problem it solves"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-text-primary-to-pink-500 hover:from-pink-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-200"
              >
                {loading ? "Generating..." : "Generate Pitch"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="px-6 py-4">
          {loading ? (
            <p className="text-center w-full text-gray-600">
              Generating your pitch...
            </p>
          ) : (
            result && (
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {result}
              </p>
            )
          )}
        </CardFooter>
      </Card>
    </>
  );
}
