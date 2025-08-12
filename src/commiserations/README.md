# 🚀 August 11

Hey there, is it just me or does the onslaught of AI and LLM assisted coding not only grant me more time to pick on the side quests I've always meant to get to (like my own webpage), but simultaneously drown in endless code review?

FR FR. ✌️

# 🥸 August 6th

It's been a hot minute since I tried to convince my kids to get to know about programming.  Fast forward 5 years
to this summer "vacation" and I found a new avenue: "vibe" coding, but first let me tell you a story.

Around March of 2020, like many families in the US, my kids were a permanent fixture at home.  It wasn't the 
first time we'd had the family together in an educational setting (as a family, we had experimented with home
schooling), but it was the first time that we were obligated into this situation.  At the time, it was my
perspective that being technically literate would become as necessary as one's capability to read the written
language (look I tried my best to not reuse a word, ok? Literacy ==! ability to write well).  So how does one
sneak in programming into my oldest son's daily routine without him noticing it was work in disguise?  You
don't.  Kids can sense the color green in their mouth easy enough.  Cloaking programming with Minecraft works
for about the same duration as it takes for a Creeper to explode.  But, hyperbole aside, I was hopeful for a
brief moment, and my son _was_ making progress.  The issue that crept up was the inevitable stumbling block. 
Whatever dopamine rush he experienced with his initial success was overcome with the drain that was caused
through lack of help and/or his experience in searching or finding resolution to his particular problems. Mix
in the shifting priorities of a young teen, and "poof" our progress was set aside.

Fast forward 5 years, and other my kids showed interest in playing in an online Minecraft community, Hypixel.
I typically limit my kids' access to online communities whether it was because of the distraction
some online activities, but I figured we could compromise their time in this community if they would explore
"vibe" coding with a new tool I'd come to love: Cursor.  They were game (in more ways than one).

At first, the invitation was only to my 14 year old son.  My other 10 year old son, who oddly enough I generally
have a hard time with getting his attention, became quickyl aware of Hypixel access in the home and jumped onto 
the vibe coding bandwagon.  It was, one night/morning at 1AM where I saw this 10 year old enjoying a branch that 
my 14 year old had just published (not Hypixel) that I heard someone in a far land scream "Bingo!".  Then my 12 
year old daughter, who had been coding curious for a while, jumped into the action.  It's been fun talking to my 
kids, less about the language they were using (Java) - and more about ideas they wanted to explore.  It's made, 
for me, what the best parts are of programming come bubbling back to the surface of programming life: creativity.

It also have shifted my role in my guidance for the kids' project: that of an architect.  I've had to
establish guiderails to make their experience more maintainable. What's the use if AI just creates a ball
of spaghetti code?  And AI loves its pasta al dente.  I'm not professionally a Java developer, but even
I can see when a class is taking on more than it needs to or how to console my son when the AI get's stuck
on exploring a solution that is either invalid or inefficient.  

I'll try to take notes here and there about the experience as I learn from it.  I'm still not completely
sold on this solution being _the way_ to ensure my children are technologically literate. My hope is that
as a bridge drug it will eventually lead them to learning how the program is achieving the functionality
they seek. Check out their progress in [the afterlife](https://github.com/lukestreeter/afterlife).

# 👷‍♂️ August 4th

I've almost finished up my first iteration of an entire project written by Cursor and Claude Code.  A friend from 
church had approached me about a redesign he was exploring with his HVAC business.  I didn't expect him
to accept my challenge to recreate it from scratch using an AI solution (I really thought he was just 
showing off the new design).  He did, though, and I was committed enough to learning what an AI assisted
project would be capable of achieving(and how quickly).

This wouldn't be a chat session within a browswer mind you. This was about providing the entirety of a
repository to an AI powered development tool: Cursor (you'll note that I did not say IDE, hey I have my
principles, and IDE this is not, it's a fork of VSCode).  Having worked with AI in the past for simple
questions, I was not unaware of the struggles of working with AI: providing enough context while also
condensing the task in a window that that the AI could still coherently process.  I'd been burned 
on multiple occassions by halucinations and the overly positive wishful thinking that AI code sometimes
projected, but this is software engineering - mistakes aren't horrible in the dev environment.

What was more interesting in this new agentic development workflow was the introduction of MCP tools, both
those that Cursor comes with as well as those you can add. I'm still exploring the use of MCP tools because
I've been wary of introducing any from just the general pool - I'm concerned with this wild west being yet
another place where bad actors can take advantage.  I also know that each tool I add increases the chances
that something else will cause Cursor to crash (which, to me is still somewhat flaky and CPU/Memory intensive
on its own). Those I have introduced include the playwright integration that microsoft published. That did
provide some useful debugging with its console access.  Another I did not expect to find use from but have 
been pleasantly surprised is MUI's MCP tooling.

In addition to MCP tools, I was also surprised by the utility that rules afford by maintaining in the context
of each of my messages bespoke programming practices. They've become so useful to me, that I'm trying to more
conscioulsy trying remember to add rules when I find myself having to restate how I want something work.
Initially, that meant adding it through the `.cursor/*.mdc` files - as I've progressed into Claude Code that
meant working in the `Claude.md` file.  More recently I've seen that Claude has adopted the `.claude`
directory scheme and I wouldn't be surprised that the aforementioned file finds its way in there.
very important in cases where I tried my best to help the agents understand that re-creating the wheel,
while impressive, is often wasteful and introduces the one thing that software engineers want to avoid:
responsibilty. 

Another thing, I was surprised how much of a rush you get from letting the agent run the code
it just ran and immediately work towards solving it.  It's rare, but there have been occassions, where I have
to stop it because either A) its to comfortable with wasting my precious tokens B) the task its attempting 
causes a deadlock (usually do to port usage) or C) I already no the solution its going after is a dead end
either because I know a better one (or embarassingly because it already attempted the failing solution prior).

I'm still taking notes about what I like and don't like - I'll try and consolidate the learnings after I finish
up my friend's refactor - have a look at its progress both through [the github page](https://github.com/marcstreeter/honeycomb-web) 
aswell as by taking [a peek at its look](https://marcstreeter.github.io/honeycomb-web/).