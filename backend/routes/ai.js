
const express = require('express');
const OpenAI = require('openai');

module.exports = (db) => {
  const router = express.Router();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  // Process resume and extract information
  router.post('/process-resume', async (req, res) => {
    try {
      const { resumeText } = req.body;
      
      if (!resumeText) {
        return res.status(400).json({ message: 'Resume text is required' });
      }
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that extracts structured information from resumes. Return the extracted data in a structured JSON format with the following fields: name, email, phone, experience (in years), education (as an array), skills (as an array), and positions (most recent job title)."
          },
          {
            role: "user",
            content: resumeText
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const extractedData = JSON.parse(completion.choices[0].message.content);
      res.json(extractedData);
    } catch (error) {
      console.error('Resume processing error:', error);
      res.status(500).json({ message: 'AI processing failed' });
    }
  });

  // Generate job description
  router.post('/generate-job-description', async (req, res) => {
    try {
      const { title, department } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: 'Job title is required' });
      }
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional recruiter who writes compelling job descriptions. Create a detailed job description that includes a summary, responsibilities, and requirements. Return the data in JSON format with description, responsibilities (as an array), and requirements (as an array) fields."
          },
          {
            role: "user",
            content: `Create a job description for a ${title} position${department ? ` in the ${department} department` : ''}.`
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const jobDescription = JSON.parse(completion.choices[0].message.content);
      res.json(jobDescription);
    } catch (error) {
      console.error('Job description generation error:', error);
      res.status(500).json({ message: 'AI processing failed' });
    }
  });

  return router;
};
