export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">
      <Section title="The app">
        <p>
          An interactive calculator for <em>The Adventure Zone</em> board game. Pick a villain deck,
          location deck, relic deck, and party of 3–5 classes. The estimated win rate updates as
          you choose, along with other statistics: average turns to complete, how games tend to
          end, and more.
        </p>
        <p>
          Hover over the <button type="button" aria-label="More info" className="inline-flex items-center text-taz-parchment-dim hover:text-taz-brass transition-colors focus:outline-none focus-visible:text-taz-brass"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button> to
          see more info about any statistic.
          <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
            <li><strong className="text-taz-brass">Villain Defeated:</strong> Percentage of winning games where the villain deck was completed.</li>
            <li><strong className="text-taz-brass">Location Cleared:</strong> Percentage of winning games where the location deck was completed.</li>
            <li><strong className="text-taz-brass">End-of-Location Losses:</strong> Only shows up when Train or Race location are chosen.
            Percentage of losing games where players lost due to reaching the end of the location deck, rather than running out of health.</li>
            <li><strong className="text-taz-brass">End-of-Location Losses:</strong> Only shows up when Train or Race location are chosen.
            Percentage of losing games where players lost due to reaching the end of the location deck, rather than running out of health.</li>
            <li><strong className="text-taz-brass">Nemesis Early/Late:</strong> Only shows up when Hoard relic is chosen.
            Win rate of games where the "Nemesis" card shows up early (first five cards) or late (last five cards).</li>
          </ul>
        </p>
      </Section>

      <Section title="The board game">
        <p>
          <em>The Adventure Zone: Bureau of Balance</em> is a collaborative storytelling card game for 2–5 players,
          designed by <ExtLink href="https://www.twogetherstudios.com/pages/about-us">Twogether Studios</ExtLink> (Keith Baker &amp; Jenn Ellis)
          in collaboration with <ExtLink href="https://www.themcelroy.family/">The McElroy Family</ExtLink>, with art
          by <ExtLink href="https://www.hari-illustration.com/">Hari Connor</ExtLink>.
        </p>
        <p>
          The party selects a villain, a location, and a relic, each represented by a 10-card
          challenge deck, then works through those decks. The goal: reclaim the dangerous relic, and
          either defeat the villain or escape the location.
        </p>
        <p>
          <ExtLink href="https://www.twogetherstudios.com/products/the-adventure-zone-bureau-of-balance-game-us-canada">
            View the game at Twogether Studios →
          </ExtLink>
        </p>
      </Section>

      <Section title="The simulator">
        <p>
          The data for this web app comes from a simulator written in Python that plays the game about
          as well as a mostly-sober human with incomplete information, loosely planning
          one step ahead. Every possible configuration was run many thousands of times, enough to
          tighten the confidence interval on each game board set-up to a fraction of a percent.
        </p>
        <p>
          The goal of this project was not to "solve" <em>The Adventure Zone</em>.
          I just thought it would be fun to build a bot that played the game, and use it to statistically answer some
          interesting questions.
        </p>
        <p>
          The sim models one particular, moderately-optimized playstyle.
          Experienced players will beat these numbers, and casual players may underperform them.
        </p>
        <p>
          <ExtLink href="https://github.com/wccbuck/tazgamesim">
            See the simulation code at my Github →
          </ExtLink>
        </p>
        <h3 className="font-germania text-xl text-taz-brass tracking-wider mb-3 mt-6">Assumptions and Caveats</h3>
        <p>
          I had to make several assumptions in the creation of the simulator. First and foremost:
          <strong>"Story +1" bonuses are always applied.</strong> I assume when you play this game at home that you are also always awarding story bonuses when someone puts in the effort.
          It is a collaborative storytelling game, after all.
          <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
            <li><strong className="text-taz-brass">Discard Abilities:</strong> Whenever a player character
              draws a third Fantasy KostCO (FKC) card, or whenever the players uncover a Surprise when one is already in play,
              the game says one of the excess needs to be discarded by the end of the turn.
              In my home game (and in this simulation), the discard ability of the card triggers
              on these end-of-turn discards.
            </li>
            <li><strong className="text-taz-brass">Max Health is Starting Health:</strong> The rulebook does not explicitly state
              that you can't heal above 10 Health in a 4-player or 5-player game, but this simulator assumes you can't.
            </li>
            <li><strong className="text-taz-brass">Ignored Card Effects:</strong> The simulator ignores the optional effects of the
            following cards: Wandering Merchant, Gift Shop, Fantasy Gachapon.
            </li>
          </ul>
        </p>
      </Section>
      <Section title="House rules & alternate formats">
        <p>Some house rules I use in my home games. The simulator <strong>does not</strong> assume you play with these house rules.</p>
        <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
          <li><strong className="text-taz-brass">Priest Healing:</strong> Rules-as-written, the Priest can only heal at the end of <em>their</em> turn.
          This creates a strong incentive to place them last in the round so that they have more opportunities to choose between assisting and healing.
          The restriction seems unnecessary, and I don't like always feeling forced to play last-in-round as Priest, so I play with a house rule that the
          Priest may choose to heal at the end of <em>any</em> player's round.
          </li>
          <li><strong className="text-taz-brass">Train/Race Decks:</strong> These two location decks are extremely difficult. You can fail only eight challenges total
          total and still hope to win. When I play these decks, I let players choose to discard their action token (if possible) instead of discarding a
          location card when they fail a challenge. This does increase win rate somewhat, but not as much as you'd think; however, it does give players a
          feeling of having more control over outcomes, as well as more opportunities to roleplay.
          </li>
          <li><strong className="text-taz-brass">FKC Deck Adjustments:</strong> For my home games, I chose to edit two of the Fantasy KostCo cards to
          better fit their theme and better distribute the types of bonuses available. Namely: the "Monster" bonus on "Lens of Creeping" and "Scrying Bones"
          has been changed to "Spooky". This change does not impact win rates to a measurable degree.
          </li>
          <li><strong className="text-taz-brass">Campaigns:</strong> Playing in a "Campaign" of multiple games, it can be fun to have your characters get stronger
          before facing off against tougher threats.<br/><br/>
          <div className="text-taz-brass-bright">After Game 2, all players get +1 to <em>assists</em> on challenges their class is good at.<br/>
          After Game 4, all players get +1 to their base strength (not their specialty).</div><br/>
          With this "level up" house rule, you can face off against deck combinations that get increasingly difficult without seeing a large dip in win rate. Suggested campaign:
          <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
            <li>
              <strong>Game 1:</strong> Lich, Staff, Carnival
            </li>
            <li>
              <strong>Game 2:</strong> Giant, Staff, Cave
            </li>
            <li>
              <strong>Game 3:</strong> Cult, Ring, Tomb
            </li>
            <li>
              <strong>Game 4:</strong> Dark Lord, Sword, Race
            </li>
            <li>
              <strong>Game 5:</strong> Crew, Hoard, Temple
            </li>
            <li>
              <strong>Game 6:</strong> Dragon, Idol, Train
            </li>
          </ul>
          </li>
        </ul>
      </Section>
      <Section title="About me">
        <p>
          My name's Will, and I like to make tools, toys, and games. My links (more to come soon):
        </p>
        <p>
          <ExtLink href="https://github.com/wccbuck">
            My Github →
          </ExtLink><br/>
          <ExtLink href="https://ko-fi.com/wccbuck">
            My tip jar →
          </ExtLink><br/>
          <ExtLink href="https://eberron.tiddlyhost.com/">
            The Eberron TW, interactive wiki for the Eberron Campaign Setting →
          </ExtLink>
        </p>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-germania text-3xl text-taz-brass tracking-wider uppercase mb-3">
        {title}
      </h2>
      <div className="text-taz-parchment/90 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-taz-brass hover:text-taz-brass-bright underline decoration-taz-brass/40 hover:decoration-taz-brass-bright underline-offset-2 transition-colors"
    >
      {children}
    </a>
  )
}
