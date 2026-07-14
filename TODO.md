# TODO — Pending Calculator Modes

## Ruina (Bankroll Ruin Calculator)
Given a fixed stake and bankroll, calculate:
- How many consecutive losses before going broke
- Probability of ruin at different win rates
- Break-even win rate for given odds
- Expected number of bets until ruin

**Inputs:** bankroll, stake per bet, odds, win rate %
**Outputs:** bets until ruin, ruin probability, survival curve chart

---

## Break-even (Win Rate Calculator)
Answer: "What win rate do I need to not lose money?"

**Inputs:** odds, commission/vig %
**Outputs:** required win rate %, current edge, Kelly stake recommendation

---

## Future ideas
- Parlay builder (combined odds, multi-leg)
- Value bet detector (implied probability vs your estimated probability)
- Bankroll growth simulator (Monte Carlo)
