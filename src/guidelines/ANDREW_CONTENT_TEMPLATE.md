# ✍️ Andrew's Content Template - Write Your Own Voice

## Overview

This template helps you (Andrew) write conversational search content in your authentic voice. We've generated starter content, but **you should edit it to sound exactly like you**.

---

## 📋 Content Template Format

For each search intent, you'll write:

1. **Search Term** - What the customer typed
2. **Title** - The headline they see
3. **Intro (1-2 sentences)** - Your opening that acknowledges their concern
4. **Body (2-3 paragraphs)** - Your explanation and guidance
5. **Quick Filters** - Categories to help them narrow down

---

## 🎯 TOP 10 PRIORITY SEARCHES (Write These First)

These are your most important - they'll get 60-70% of traffic. Write these in your authentic voice:

### **1. SLEEP**
**Current Intro:**
> "I hear from customers every day about sleep struggles. Here's what I've learned actually works:"

**Your Version:**
```
[EDIT THIS - How would YOU personally address someone struggling with sleep?]




```

**Current Body:**
> "Quality sleep isn't just about being tired—it's a complex dance between minerals (especially Magnesium, which most of us don't get enough of), brain chemicals like GABA and Serotonin that help you feel calm, and your body's natural sleep-wake rhythm..."

**Your Version:**
```
[EDIT THIS - Explain sleep in YOUR words. What do customers need to know? What have you learned in your decades of experience?]






```

---

### **2. ENERGY / FATIGUE**
**Current Intro:**
> "Fatigue is one of the most common concerns I hear about. Let me help you get to the bottom of it."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Low energy is your body trying to tell you something. Often it's simple nutrient gaps—B vitamins (especially B12) that help turn food into fuel, or iron that carries oxygen to every cell..."

**Your Version:**
```
[EDIT THIS]






```

---

### **3. JOINT PAIN / JOINT HEALTH**
**Current Intro:**
> "I know how joint discomfort can really affect quality of life. Here's my approach:"

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Your joints are asking for help, and there are two main things they need: building blocks to repair cartilage (like Glucosamine), and support to calm inflammation..."

**Your Version:**
```
[EDIT THIS]






```

---

### **4. BRAIN HEALTH / COGNITIVE FUNCTION**
**Current Intro:**
> "Brain fog, memory slips, trouble focusing? I've formulated products specifically for this."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Here's something interesting I always share: your brain is about 60% fat, and the type of fat matters hugely..."

**Your Version:**
```
[EDIT THIS]






```

---

### **5. DIGESTIVE HEALTH / GUT HEALTH**
**Current Intro:**
> "Digestive issues are frustrating, and I've helped thousands of people address them."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Your gut is home to trillions of bacteria that help digest food, make vitamins, and even influence your mood..."

**Your Version:**
```
[EDIT THIS]






```

---

### **6. IMMUNE SUPPORT**
**Current Intro:**
> "Staying healthy is on everyone's mind. Here's what I've learned actually helps."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Your immune system is like a security team that needs specific tools to work well..."

**Your Version:**
```
[EDIT THIS]






```

---

### **7. HEART HEALTH / CARDIOVASCULAR**
**Current Intro:**
> "I've always said heart health is about more than just cholesterol. Let's look at the full picture."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Your cardiovascular system needs several things to thrive: flexible, strong blood vessels; smooth blood flow..."

**Your Version:**
```
[EDIT THIS]






```

---

### **8. STRESS / MOOD / ANXIETY**
**Current Intro:**
> "Feeling stressed or anxious? I've developed products specifically to support you during tough times."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Stress and mood are about more than just willpower—they're deeply tied to brain chemistry..."

**Your Version:**
```
[EDIT THIS]






```

---

### **9. BRAIN FOG**
**Current Intro:**
> "Brain fog is that frustrating feeling where your mind just isn't sharp. Let's clear it up."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "You know that feeling—like you're thinking through molasses, forgetting words..."

**Your Version:**
```
[EDIT THIS]






```

---

### **10. ALWAYS TIRED**
**Current Intro:**
> "Constant fatigue is exhausting (literally). Let's figure out what might be going on."

**Your Version:**
```
[EDIT THIS]




```

**Current Body:**
> "Being tired all the time isn't normal, even though it's common. Your body is trying to tell you something..."

**Your Version:**
```
[EDIT THIS]






```

---

## 📝 WRITING GUIDELINES

### **Your Voice Should Include:**

✅ **Personal Experience**
- "In my decades formulating supplements..."
- "I've seen this work for thousands of customers..."
- "When I developed this formula..."

✅ **Empathy**
- Acknowledge their struggle first
- Show you understand how it affects their life
- "I hear this all the time..."

✅ **Education Without Jargon**
- Explain the science simply
- Use analogies that make sense
- "Think of it like..."

✅ **Honest Expectations**
- Tell them realistic timelines
- "Most people notice... within 2-4 weeks"
- Don't overpromise

✅ **Quality Commitment**
- "I wouldn't sell anything I wouldn't take myself"
- "I personally oversee every formulation"
- Your standards and why they matter

### **Avoid:**

❌ Marketing speak or sales-y language
❌ Overpromising results
❌ Technical jargon without explanation
❌ Generic "we" language (use "I")
❌ Vague claims

---

## 🔄 HOW TO UPDATE THE SYSTEM

Once you've written your content:

### **Option 1: Quick Update (Hand-Written Content)**

Edit `/utils/searchIntent.ts` and replace the content:

```typescript
if (name.toLowerCase().includes('sleep')) {
  return {
    title: 'YOUR TITLE HERE',
    description: '',
    conversationalIntro: 'YOUR INTRO HERE',
    conversationalBody: 'YOUR BODY HERE (use \\n\\n for paragraph breaks)',
    quickFilters: [
      { label: '😴 Falling Asleep', value: 'onset' },
      { label: '🌙 Staying Asleep', value: 'maintenance' },
      { label: '⭐ Sleep Quality', value: 'quality' },
      { label: 'All', value: 'all' },
    ],
  };
}
```

### **Option 2: CMS/Spreadsheet Approach (Future)**

We can build a simple CMS where you can:
1. Log in to admin panel
2. Edit content for each search term
3. Preview changes
4. Publish when ready

This way you don't need to edit code!

---

## 💡 TEMPLATE FOR INGREDIENTS (196 Total)

For each ingredient, write a short blurb:

**Format:**
```
INGREDIENT: Magnesium

YOUR INTRO (1 sentence):
"I use Magnesium in many of my formulations—here's why."

YOUR EXPLANATION (2-3 sentences):
[Why you include it, what it does, your experience with it]




WHAT CUSTOMERS SHOULD KNOW:
[Any important timing, dosage, or combination info]


```

**Examples to Fill In:**

1. **Magnesium**
   ```
   [Your intro]
   
   
   [Your explanation]
   
   
   
   [Customer tips]
   
   ```

2. **Vitamin D3**
   ```
   [Your intro]
   
   
   [Your explanation]
   
   
   
   [Customer tips]
   
   ```

3. **Omega-3**
   ```
   [Your intro]
   
   
   [Your explanation]
   
   
   
   [Customer tips]
   
   ```

*(Continue for top 20 ingredients)*

---

## 📊 PRIORITIZATION

### **Phase 1: Top 10 Health Goals** (Write These First)
These get the most traffic. Focus your time here.

### **Phase 2: Top 20 Ingredients** (Next Priority)
Magnesium, Vitamin D3, Omega-3, CoQ10, Turmeric, etc.

### **Phase 3: Categories** (If Time Permits)
Anti-aging, Beauty, Bone Health, etc.

### **Phase 4: Everything Else**
The templates will handle the long-tail searches adequately.

---

## 🎯 QUALITY MARKERS

Your content is "Andrew-ready" when:

✅ **It sounds like you talking** (read it out loud)
✅ **It's educational but accessible** (your neighbor could understand it)
✅ **It's honest** (realistic expectations, not hype)
✅ **It shows your expertise** (decades of knowledge)
✅ **It shows you care** (empathy for customer's struggle)
✅ **It's actionable** (helps them choose)

---

## 🚀 QUICK START

**For Andrew:**

1. **Start with sleep** - It's probably your #1 search
2. **Write it in your voice** - Don't worry about perfection
3. **Read it to someone** - Does it sound like you?
4. **Send it to the dev team** - They'll plug it in
5. **Review on the live site** - See how it looks
6. **Iterate** - Refine until it feels right

Then move to the next topic.

---

## 💬 QUESTIONS FOR ANDREW

As you write, consider:

- **What do customers ask you most about [topic]?**
- **What misconceptions do you want to clear up?**
- **What's your personal philosophy on [topic]?**
- **What's a story or analogy that explains this well?**
- **What timeline should customers expect?**
- **What combinations or approaches do you recommend?**

---

## 📧 SUBMISSION FORMAT

When you're ready to submit content:

**Subject:** Content for [Search Term]

**Body:**
```
SEARCH TERM: Sleep

TITLE: [Your title]

INTRO:
[Your intro]

BODY:
[Your full explanation - use double line breaks between paragraphs]

QUICK FILTERS:
- Filter 1 name
- Filter 2 name
- Filter 3 name

NOTES:
[Any special instructions or context for the dev team]
```

---

## 🎨 EXAMPLES OF GREAT ANDREW VOICE

**Example 1: Personal Experience**
> "In my 40+ years formulating supplements, I've learned that quality sleep isn't about one magic ingredient—it's about giving your body the tools it needs at the right time."

**Example 2: Empathy + Education**
> "I hear from customers constantly about brain fog. It's frustrating—you know you're sharp, but your brain just won't cooperate. Here's what I've learned: your brain is literally made of fat, and if you're not getting the right kinds (especially DHA from Omega-3), it's like trying to run a car on the wrong fuel."

**Example 3: Honest Expectations**
> "Let me be honest with you: joint support isn't instant. The formulas that rebuild cartilage take 6-8 weeks before you really feel the difference. But those weeks pass whether you do something or not, and customers who stick with it tell me it changes their quality of life."

---

**Remember:** The AI-generated content is a starting point. Your authentic voice, experience, and knowledge will make it truly special. Take your time and make it yours!
