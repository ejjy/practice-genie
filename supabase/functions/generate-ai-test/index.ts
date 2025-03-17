
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { examType, topic, numQuestions } = await req.json();
    
    // Mock data generation function
    function generateMockQuestions(examType: string, topic: string, numQuestions: number) {
      const questions = [];
      
      for (let i = 0; i < numQuestions; i++) {
        const questionNum = i + 1;
        const options = [
          `Option A for question ${questionNum}`,
          `Option B for question ${questionNum}`,
          `Option C for question ${questionNum}`,
          `Option D for question ${questionNum}`,
        ];
        
        const correctAnswer = Math.floor(Math.random() * 4);
        
        questions.push({
          id: questionNum,
          text: `Generated question ${questionNum} about ${topic} for ${examType}`,
          options: options,
          correctAnswer: correctAnswer,
          explanation: `This is an explanation for question ${questionNum} about ${topic} for ${examType}.`,
        });
      }
      
      return questions;
    }
    
    // Generate mock questions
    const generatedQuestions = generateMockQuestions(examType, topic, numQuestions);
    
    return new Response(JSON.stringify({ 
      questions: generatedQuestions,
      message: "Test generated successfully"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
