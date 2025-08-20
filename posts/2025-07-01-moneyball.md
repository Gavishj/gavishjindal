

[GitHub repo](https://github.com/Gavishj/Moneyball) • [Live demo](http://www.money-ball.in)

---

**Moneyball**; the story isn’t just about baseball, it’s about looking at the game in a completely new way, breaking tradition with numbers and logic. I had probably watched the movie ten times until I actually thought: what if I tried a similar approach, but in something I follow closely — sports betting? Instead of going with gut feelings or popular picks, I wanted to see what happens when you let data and calculation guide the choices. That idea is what sparked this project.

---

It first started with a simple Google Sheet that worked on a function based on **Kelly’s Criterion**.  
In short, the Kelly Criterion is a formula that helps decide how much money to bet (or invest) so that your wealth grows as much as possible over the long run. The whole concept of this sheet was to play along the **edge** on sports betting — higher the edge, higher the betting amount.
Here’s how the edge was calculated in my original Google Sheet:

![Google Sheet calculating edges](/posts/moneyball-sheet.png)


Every betting site offers you a return if your bet wins.  
Take a simple example: if Liverpool win and the site offers you **1.5×** your money, that’s the **actual odds**. But in my view, the “fair” return should really be around **1.3×** — that’s what I call the **implied odds**. The difference between the two is the **edge**.  

In this case:  
`1.5 – 1.3 = 0.2`.  

That edge is what makes the bet worth considering. From there, the Kelly Criterion takes over — it looks at my total balance and allocates more money to bets with a bigger edge, and less to those with a smaller one.

> **Actual Odds:** 1.5 × return if Liverpool win  
> **Implied Odds:** 1.3 (what I think is fair)  
> → **Edge = 0.2**

---

If you’ve understood what I’ve done, there is only one major question that comes to mind: *how does one even get the implied odds right?* Because the implied odds are the key to this.  
So there were multiple approaches to this. Implied odds were actually calculated by taking an average of multiple implied odds from different sources such as:

- my own odds — how much I think one should get,  
- sites like Unabated, OddsJam, SpankOdds,  
- looking at multiple betting sites and then taking the minimum true odds (for example, if Bet365 offered 1.3 return on Liverpool win but Stake gave 1.5, then 1.3 became a variable for implied odds).  

So the implied odds would be:  
my own odds + odds from Unabated/OddsJam/SpankOdds + lowest site odds) ÷ N

---

As time passed, working on a Google Sheet became very tedious for me and I had to shift to something more convenient — something like a calculator or a UI.  
So I turned it into a **small web app backed by Firebase**. Every day starts by snapshotting a **Daily Start Balance (DSB)**. Bets are stored under that date with metrics such as actual odds, implied odds, and edge.  
When I shifted to a web app, the betting dashboard looked like this:

![Web app dashboard](/posts/moneyball-app.png)
![Web app dashboard](/posts/moneyball-app2.png)


Similar to the sheet, the app allocates the day’s pot across all bets proportional to their edge (if total edge is zero, it even-splits). When I flip a bet to Win/Loss, the app calculates payout, updates profit, and adjusts balance atomically in the database, then re-renders the table and stats. There’s also a daily summary view that pulls from the same data to show wins, losses, and P&L per date.

And here’s a snapshot of the daily summary page:

![Daily summary of bets](/posts/moneyball-summary-M1W9asdaFhw.png)


---

## What the web app did beyond the sheet

- **Real database, not cells**  
- **Automatic day tracking (DSB)**  
- **Edge-based bankroll allocation** (per date, across multiple bets)  
- **Live P&L + balance integrity**  
- **Batch input + re-calc**  
- **Full CRUD with UI**  
- **Daily summaries page**

---

## So… why did it remain an experiment?

Now, you might ask: if this was so efficient, why did it become an experiment and not an actual money-making source?  

The thing I realised after I stopped doing it was (obviously) — if a college student can crack the secret behind betting and get an average of 10% return weekly, then the whole sports betting industry would fall. Sports betting is volatile, variable and often unpredictable — more unpredictable than I thought.

To put it in perspective, I usually used to win over **75% of my bets on a good day**, and I had more good days than bad ones. But because of how the strategy worked, a 75% win ratio might result in a 25% profit on investment.  

The problem was **volatility**: every 7–8 days there’d be a “black swan” day where I’d lose over 75% of my bets, and that single day would wipe the gains of the previous week.  

After countless adjustments to the formula and altering approaches, I couldn’t escape the cycle and eventually paused the experiment. I’m sure there is a way to be profitable with a Moneyball approach, but I’m not ready to explore it yet.  

What started as something fun ended up being too time-consuming and loss-making (if not just breaking even) for the effort.

---

## What I’m taking forward

- Was it fun? **Absolutely.**  
- Did I learn more than I expected? **Definitely.**  

In the end, my “Moneyball for betting” experiment didn’t turn into a money-making machine — but it did give me something even more valuable: **a lesson in how powerful data can be when you challenge tradition and trust the numbers.**

That’s exactly what drew me to *Moneyball* in the first place, and it’s what I’ll carry into future projects.  

The story isn’t really about winning every bet — it’s about betting on ideas.  
And for me, that’s already a win.
