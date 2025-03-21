
// Import necessary Deno modules
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Function called: generate-ai-test");
    
    // Parse the request body
    let requestData;
    try {
      requestData = await req.json();
      console.log("Request data:", JSON.stringify(requestData));
    } catch (e) {
      console.error("Error parsing request body:", e);
      return new Response(
        JSON.stringify({ error: "Invalid request format", details: e.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { examType, topic, numQuestions, saveToDatabase } = requestData;
    const auth = req.headers.get('Authorization')?.replace('Bearer ', '');
    
    // Validate parameters
    if (!examType) {
      console.error("Missing examType parameter");
      return new Response(
        JSON.stringify({ error: "Missing required parameter: examType" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!topic) {
      console.error("Missing topic parameter");
      return new Response(
        JSON.stringify({ error: "Missing required parameter: topic" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!numQuestions || isNaN(parseInt(String(numQuestions)))) {
      console.error("Invalid numQuestions parameter:", numQuestions);
      return new Response(
        JSON.stringify({ error: "Invalid or missing numQuestions parameter" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating questions: examType=${examType}, topic=${topic}, numQuestions=${numQuestions}, saveToDatabase=${saveToDatabase}`);
    
    // Generate mock questions
    function generateMockQuestions(examType, topic, numQuestions) {
      console.log(`Generating ${numQuestions} questions for ${examType} on topic ${topic}`);
      const questions = [];
      
      for (let i = 0; i < numQuestions; i++) {
        const questionNum = i + 1;
        
        // Generate more realistic options based on the exam type and topic
        let options = [];
        let questionText = "";
        let explanation = "";
        
        // Customize questions based on exam type
        if (examType === 'upsc-cse') {
          questionText = `Which of the following best describes ${topic} in the context of Indian governance?`;
          options = [
            `It is a fundamental right guaranteed by Article 19 of the Constitution`,
            `It is a directive principle of state policy mentioned in Part IV`,
            `It is a provision added through the 73rd Constitutional Amendment`,
            `It is a feature introduced by the Government of India Act, 1935`
          ];
          explanation = `This question tests your understanding of ${topic} in relation to the Indian Constitution and governance structure.`;
        } 
        else if (examType === 'ssc-cgl' || examType === 'ssc-chsl') {
          questionText = `If A can do a work in 12 days and B can do the same work in 15 days, how many days will they take to complete the work together?`;
          options = [
            `6.67 days`,
            `6.5 days`,
            `7.2 days`,
            `8 days`
          ];
          explanation = `Using the formula (A×B)/(A+B), where A and B are the number of days taken by the individuals: (12×15)/(12+15) = 180/27 = 6.67 days`;
        }
        else if (examType.includes('jee') || examType === 'neet') {
          questionText = `In the context of ${topic}, which of the following statements is correct?`;
          options = [
            `Force is directly proportional to displacement`,
            `Work done in an adiabatic process is zero`,
            `Impulse is a scalar quantity`,
            `Momentum cannot be conserved in inelastic collisions`
          ];
          explanation = `The correct answer relates to the core principles of ${topic} as covered in the ${examType} syllabus.`;
        }
        else {
          // Default questions for other exam types
          questionText = `Question ${questionNum} about ${topic} for ${examType}: Which of the following statements is true?`;
          options = [
            `Option A: First possible answer related to ${topic}`,
            `Option B: Second possible answer related to ${topic}`,
            `Option C: Third possible answer related to ${topic}`,
            `Option D: Fourth possible answer related to ${topic}`
          ];
          explanation = `Explanation for question ${questionNum}: The correct answer is based on key concepts of ${topic} as relevant to ${examType}.`;
        }
        
        const correctAnswer = Math.floor(Math.random() * 4);
        
        questions.push({
          id: questionNum,
          text: questionText,
          options: options,
          correctAnswer: correctAnswer,
          explanation: explanation,
        });
      }
      
      console.log(`Generated ${questions.length} questions successfully`);
      return questions;
    }
    
    // Generate the questions
    const requestedNumQuestions = parseInt(String(numQuestions));
    const generatedQuestions = generateMockQuestions(examType, topic, requestedNumQuestions);
    
    // Verify questions were generated
    if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      console.error("Failed to generate questions");
      return new Response(
        JSON.stringify({ error: "Failed to generate questions" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Successfully generated ${generatedQuestions.length} questions`);
    
    // Save to database if requested and auth token is provided
    let testId = null;
    if (saveToDatabase && auth) {
      try {
        // Create Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (!supabaseUrl || !supabaseServiceKey) {
          throw new Error("Missing Supabase credentials in environment");
        }
        
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Get user from auth token
        const { data: { user }, error: userError } = await supabase.auth.getUser(auth);
        
        if (userError || !user) {
          console.error("User authentication error:", userError);
          throw new Error("Failed to authenticate user");
        }
        
        // Create test record
        const testTitle = `${topic} (${examType})`;
        const { data: testData, error: testError } = await supabase
          .from('tests')
          .insert({
            user_id: user.id,
            title: testTitle,
            description: `Generated test on ${topic} for ${examType}`,
            exam_type: examType,
            topic: topic
          })
          .select()
          .single();
        
        if (testError) {
          console.error("Error creating test:", testError);
          throw new Error("Failed to save test");
        }
        
        testId = testData.id;
        
        // Insert questions
        const questionInserts = generatedQuestions.map(q => ({
          test_id: testId,
          text: q.text,
          options: q.options,
          correct_answer: q.correctAnswer,
          explanation: q.explanation
        }));
        
        const { error: questionsError } = await supabase
          .from('questions')
          .insert(questionInserts);
        
        if (questionsError) {
          console.error("Error inserting questions:", questionsError);
          throw new Error("Failed to save questions");
        }
        
        console.log(`Successfully saved test to database with ID: ${testId}`);
      } catch (error) {
        console.error("Database save error:", error);
        // Continue even if save fails, just log the error
      }
    }
    
    // Return the generated questions
    return new Response(
      JSON.stringify({ 
        questions: generatedQuestions,
        message: "Test generated successfully",
        testId: testId
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in generate-ai-test function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        message: "Failed to generate test questions" 
      }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
