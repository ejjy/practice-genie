
// Import necessary Deno modules
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
      console.log("Successfully parsed request body:", requestData);
    } catch (e) {
      console.error("Error parsing request body:", e);
      throw new Error("Invalid request format: " + e.message);
    }
    
    const { examType, topic, numQuestions } = requestData;
    
    // Validate parameters
    if (!examType) {
      throw new Error("Missing required parameter: examType");
    }
    if (!topic) {
      throw new Error("Missing required parameter: topic");
    }
    if (!numQuestions || isNaN(numQuestions)) {
      throw new Error("Invalid or missing numQuestions parameter");
    }

    console.log("Generating questions with parameters:", { examType, topic, numQuestions });
    
    // Mock data generation function
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
    
    // Generate mock questions
    const generatedQuestions = generateMockQuestions(examType, topic, parseInt(String(numQuestions)));
    
    if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      throw new Error("Failed to generate questions");
    }
    
    console.log(`Responding with ${generatedQuestions.length} questions`);
    
    // Return the generated questions
    return new Response(JSON.stringify({ 
      questions: generatedQuestions,
      message: "Test generated successfully"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in generate-ai-test function:', error);
    return new Response(JSON.stringify({ 
      error: error.message, 
      message: "Failed to generate test questions" 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
