import { useState, useEffect } from "react";

const palette = {
  ink: "#0F0F0E",
  imperial: "#8B2D2D",
  celadonMute: "#5C7A65",
  ceramic: "#EDEAE1",
  ceramicDark: "#D4CEC2",
  fog: "#B8B2A6",
  warmWhite: "#FAF8F4",
  text: "#1C1B19",
  textQuiet: "#7A756C",
};

const serif = "'EB Garamond', 'Playfair Display', 'Georgia', serif";
const sans = "'Helvetica Neue', 'Helvetica', sans-serif";

const pieces = [
  {
    id: 1,
    name: "Coupe Dinner Bowl",
    glaze: "Moongate",
    glazeColor: "#c2b5a5",
    image: "/images/coupe-dinner-bowl.jpg",
    price: 48,
    poem: "A bowl for gathering. The Moongate glaze was born here, in this room.",
    card: "The Moongate glaze was created for this collaboration alone — inspired by the light that falls through Mister Jiu's windows at dusk.",
    story: "Hand-thrown in Sausalito by a team of forty. The Moongate glaze was created for this collaboration alone — inspired by the light that falls through Mister Jiu's windows at dusk. Each piece carries a Yin Yang stamp beneath, invisible until you hold it.",
    fulfillment: "Arriving at your door in a linen-wrapped box, with a note from Chef Brandon Jew.",
  },
  {
    id: 2,
    name: "Small Modern Cup",
    glaze: "Pea Shoot",
    glazeColor: "#7e8e65",
    image: "/images/small-modern-cup.jpg",
    price: 32,
    poem: "For tea. For broth. For the quiet moment between courses.",
    card: "Named for the greens of Chinatown — the color of morning produce stacked on Stockton Street. Designed to be cradled, not gripped.",
    story: "The Pea Shoot glaze takes its name from the greens of Chinatown — the color of morning produce stacked on Stockton Street. A cup designed to be cradled, not gripped.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
  {
    id: 3,
    name: "Covered Serving Dish",
    glaze: "Cedar",
    glazeColor: "#6e5038",
    image: "/images/covered-serving-dish.jpg",
    price: 120,
    poem: "Cedar. Brought back from the archive. A color the earth remembers.",
    card: "This glaze was retired years ago. Brandon asked Heath to bring it back. Meant for the act of lifting a lid and revealing what's inside.",
    story: "This glaze was retired years ago. Brandon asked Heath to bring it back for this collection. The covered dish is meant for family-style dining — for the act of lifting a lid and revealing what's inside.",
    fulfillment: "Arriving at your door in a linen-wrapped box, with a note from Chef Brandon Jew.",
  },
  {
    id: 4,
    name: "Coupe Serving Platter",
    glaze: "Levain",
    glazeColor: "#d1c5af",
    image: "/images/coupe-serving-platter.jpg",
    price: 85,
    poem: "The stage for the duck. This is the platter.",
    card: "If you ordered the Peking-style roast duck tonight, it arrived on this platter. The Levain glaze disappears beneath the food, then reappears when the plate is clean.",
    story: "If you ordered the Peking-style roast duck tonight, it arrived on this platter. The Levain glaze is warm and creamy — designed to disappear beneath the food, then reappear when the plate is clean.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
  {
    id: 5,
    name: "Coupe Dinner Plate",
    glaze: "Sunflower Gloss",
    glazeColor: "#bfa04a",
    image: "/images/coupe-dinner-plate.jpg",
    price: 42,
    poem: "Golden. Like late afternoon in the Outer Sunset.",
    card: "Heath's Coupe line has been in continuous production since 1948. The Sunflower Gloss is one of the glazes on this table every night — a classic, not a limited edition.",
    story: "Heath's Coupe line has been in continuous production since 1948. The Sunflower Gloss is one of the glazes you'll find on the table at Mister Jiu's every night — a classic, not a limited edition.",
    fulfillment: "Arriving at your door in a linen-wrapped box, with a note from Chef Brandon Jew.",
  },
  {
    id: 6,
    name: "Rim Salad Plate",
    glaze: "Sand",
    glazeColor: "#b5a68e",
    image: "/images/rim-salad-plate.jpg",
    price: 36,
    poem: "Sand. The color of Baker Beach at low tide.",
    card: "The Rim line's raised edge frames whatever is placed upon it. The Sand glaze holds space without competing — chosen to let the food lead.",
    story: "The Rim line is defined by its raised edge — a subtle frame for whatever is placed upon it. The Sand glaze is neutral in the best sense: it holds space without competing.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
];

function Fade({ children, delay = 0, duration = 900 }) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(12px)",
      transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    }}>
      {children}
    </div>
  );
}

function Field({ lbl, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: palette.fog, marginBottom: 10 }}>{lbl}</p>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 0", background: "none", border: "none",
          borderBottom: `0.5px solid ${palette.ceramicDark}`, fontFamily: serif,
          fontSize: 17, color: palette.text, outline: "none", borderRadius: 0,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("gallery");
  const [activePiece, setActivePiece] = useState(null);
  const [bag, setBag] = useState([]);
  const [trans, setTrans] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const go = (v, piece = null) => {
    setTrans(true);
    setTimeout(() => {
      setView(v);
      if (piece) setActivePiece(piece);
      setTrans(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 380);
  };

  const addToBag = (p) => {
    const exists = bag.find(i => i.id === p.id);
    if (exists) setBag(bag.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    else setBag([...bag, { ...p, qty: 1 }]);
  };

  const removeBag = (id) => setBag(bag.filter(i => i.id !== id));
  const total = bag.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ opacity: trans ? 0 : 1, transition: "opacity 380ms ease", minHeight: "100vh", background: palette.ceramic }}>
      {view === "gallery" && <Gallery pieces={pieces} bag={bag} onSelect={p => go("detail", p)} onBag={() => go("bag")} />}
      {view === "detail" && activePiece && <Detail piece={activePiece} bag={bag} onBack={() => go("gallery")} onAdd={p => addToBag(p)} onBag={() => go("bag")} />}
      {view === "bag" && <Bag bag={bag} onBack={() => go("gallery")} onRemove={removeBag} onCheckout={() => go("checkout")} total={total} />}
      {view === "checkout" && <Checkout bag={bag} total={total} name={name} email={email} addr={addr} city={city} zip={zip} setName={setName} setEmail={setEmail} setAddr={setAddr} setCity={setCity} setZip={setZip} onBack={() => go("bag")} onConfirm={() => go("confirmed")} />}
      {view === "confirmed" && <Confirmed name={name} email={email} total={total} onDone={() => { setBag([]); setName(""); setEmail(""); setAddr(""); setCity(""); setZip(""); go("gallery"); }} />}
    </div>
  );
}

// ─── GALLERY ───────────────────────────────────────────────────

function Gallery({ pieces, bag, onSelect, onBag }) {
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic }}>

      {/* Nav — mesa + Bag only */}
      <div style={{
        padding: "18px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink, letterSpacing: "0.07em" }}>mesa</span>
        <button onClick={onBag} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: bagCount > 0 ? palette.ink : palette.fog,
        }}>
          Bag{bagCount > 0 ? ` · ${bagCount}` : ""}
        </button>
      </div>

      {/* ── HERO NARRATIVE ── */}
      <Fade delay={100} duration={1000}>
        <div style={{ padding: "48px 24px 0", textAlign: "center" }}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.32em",
            textTransform: "uppercase", color: palette.celadonMute, margin: "0 0 22px",
          }}>
            Mister Jiu's × Heath Ceramics
          </p>
          <h1 style={{
            fontFamily: serif, fontSize: 44, fontWeight: 400,
            color: palette.ink, margin: 0, lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}>
            Everything on your<br />table tonight.
          </h1>
        </div>
      </Fade>

      <Fade delay={320} duration={900}>
        <div style={{ padding: "28px 32px 0", textAlign: "center" }}>
          <p style={{
            fontFamily: serif, fontSize: 16, fontStyle: "italic",
            color: palette.textQuiet, lineHeight: 1.8,
            maxWidth: 340, margin: "0 auto",
          }}>
            The ceramics you ate from were made by hand in Sausalito —
            one mile away. They're available to bring home.
          </p>
        </div>
      </Fade>

      {/* ── MAKER PROVENANCE STRIP ── */}
      <Fade delay={480} duration={800}>
        <div style={{
          margin: "40px 24px 0",
          padding: "18px 20px",
          borderTop: `0.5px solid ${palette.ceramicDark}`,
          borderBottom: `0.5px solid ${palette.ceramicDark}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 12,
        }}>
          <div>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog, margin: "0 0 3px" }}>
              Made by
            </p>
            <p style={{ fontFamily: serif, fontSize: 14, color: palette.ink, margin: 0 }}>
              Heath Ceramics
            </p>
          </div>
          <div style={{ width: "0.5px", height: 28, background: palette.ceramicDark, flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog, margin: "0 0 3px" }}>
              Founded
            </p>
            <p style={{ fontFamily: serif, fontSize: 14, color: palette.ink, margin: 0 }}>
              Sausalito, CA · 1948
            </p>
          </div>
          <div style={{ width: "0.5px", height: 28, background: palette.ceramicDark, flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog, margin: "0 0 3px" }}>
              Selected by
            </p>
            <p style={{ fontFamily: serif, fontSize: 14, color: palette.ink, margin: 0 }}>
              Chef Brandon Jew
            </p>
          </div>
        </div>
      </Fade>

      {/* ── PRODUCT GRID ── */}
      <Fade delay={600} duration={900}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "36px 20px",
          padding: "40px 24px 0",
        }}>
          {pieces.map((piece, i) => (
            <StoryTile key={piece.id} piece={piece} onSelect={onSelect} index={i} />
          ))}
        </div>
      </Fade>

      {/* ── CHEF QUOTE ── */}
      <Fade delay={0} duration={800}>
        <div style={{ padding: "72px 32px 36px", textAlign: "center" }}>
          <div style={{ width: 24, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 32px" }} />
          <p style={{
            fontFamily: serif, fontSize: 19, fontStyle: "italic",
            color: palette.ink, lineHeight: 1.85, maxWidth: 360, margin: "0 auto",
          }}>
            "The ceramics are as much a part of the dish as the food itself. I wanted guests to be able to take that feeling home."
          </p>
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.imperial, marginTop: 20 }}>
            Brandon Jew · Chef & Owner, Mister Jiu's
          </p>
        </div>
      </Fade>

      {/* ── ABOUT HEATH ── */}
      <Fade delay={0} duration={800}>
        <div style={{
          margin: "0 24px",
          padding: "28px 0 28px",
          borderTop: `0.5px solid ${palette.ceramicDark}`,
        }}>
          <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.celadonMute, margin: "0 0 10px" }}>
            About the maker
          </p>
          <p style={{ fontFamily: serif, fontSize: 14, color: palette.textQuiet, lineHeight: 1.85, margin: 0 }}>
            Heath Ceramics has been hand-throwing functional ceramics in Sausalito since 1948.
            Each piece in this collection was glazed in colors chosen specifically for Mister Jiu's
            — some revived from the Heath archive at Brandon Jew's request.
          </p>
        </div>
      </Fade>

      {/* Footer */}
      <div style={{ padding: "20px 24px 48px", borderTop: `0.5px solid ${palette.ceramicDark}`, margin: "0 24px" }}>
        <span style={{ fontFamily: serif, fontSize: 11, color: palette.fog, letterSpacing: "0.07em" }}>mesa</span>
        <p style={{ fontFamily: sans, fontSize: 9, color: palette.fog, margin: "6px 0 0", letterSpacing: "0.06em" }}>
          Mister Jiu's earns a share of every purchase
        </p>
      </div>

    </div>
  );
}

// ─── STORY TILE ────────────────────────────────────────────────
// No borders, no boxes. Product floats on cream via mix-blend-mode.
// Every tile carries maker provenance and an emotional story fragment.

function StoryTile({ piece, onSelect }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onSelect(piece)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Product image — no box, no border, floats on page */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: "4 / 5",
        marginBottom: 14,
      }}>
        <img
          src={piece.image}
          alt={piece.name}
          style={{
            position: "absolute",
            top: "4%", left: "4%",
            width: "92%", height: "92%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            transition: "transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease",
            transform: hover ? "scale(1.04)" : "scale(1)",
            opacity: hover ? 0.88 : 1,
          }}
        />
      </div>

      {/* Maker attribution — provenance first */}
      <p style={{
        fontFamily: sans, fontSize: 8, letterSpacing: "0.18em",
        textTransform: "uppercase", color: palette.fog, margin: "0 0 5px",
      }}>
        Heath Ceramics · Sausalito
      </p>

      {/* Product name */}
      <h3 style={{
        fontFamily: serif, fontSize: 15, fontWeight: 400,
        color: palette.ink, margin: "0 0 7px", lineHeight: 1.2,
      }}>
        {piece.name}
      </h3>

      {/* Story fragment — emotional context */}
      <p style={{
        fontFamily: serif, fontSize: 12, fontStyle: "italic",
        color: palette.textQuiet, lineHeight: 1.65,
        margin: "0 0 10px",
      }}>
        {piece.card}
      </p>

      {/* Glaze + Price — inline, secondary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: sans, fontSize: 8, color: palette.fog, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {piece.glaze}
        </span>
        <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink }}>
          ${piece.price}
        </span>
      </div>
    </div>
  );
}

// ─── DETAIL ────────────────────────────────────────────────────

function Detail({ piece, bag, onBack, onAdd, onBag }) {
  const [added, setAdded] = useState(false);
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);

  const handleAdd = () => {
    onAdd(piece);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic }}>

      {/* Nav */}
      <div style={{
        padding: "18px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `0.5px solid ${palette.ceramicDark}`,
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>
          ← Back
        </button>
        <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink, letterSpacing: "0.07em" }}>mesa</span>
        <button onClick={onBag} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: bagCount > 0 ? palette.ink : palette.fog }}>
          Bag{bagCount > 0 ? ` · ${bagCount}` : ""}
        </button>
      </div>

      {/* Hero image — full width, floats on cream */}
      <Fade delay={60} duration={700}>
        <div style={{ padding: "32px 24px 0" }}>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 3" }}>
            <img
              src={piece.image}
              alt={piece.name}
              style={{
                position: "absolute",
                top: "4%", left: "4%",
                width: "92%", height: "92%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
      </Fade>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 24px" }}>

        {/* Maker attribution */}
        <Fade delay={180} duration={700}>
          <div style={{ paddingTop: 28, textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: palette.celadonMute, margin: "0 0 10px" }}>
              Heath Ceramics · Sausalito, CA · Est. 1948
            </p>
            <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 400, color: palette.ink, margin: "0 0 8px", letterSpacing: "0.01em" }}>
              {piece.name}
            </h2>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.fog, margin: 0 }}>
              {piece.glaze} Glaze
            </p>
          </div>
        </Fade>

        {/* Poem */}
        <Fade delay={280} duration={700}>
          <div style={{ paddingTop: 22, textAlign: "center" }}>
            <p style={{ fontFamily: serif, fontSize: 18, fontStyle: "italic", color: palette.textQuiet, lineHeight: 1.8, margin: 0 }}>
              {piece.poem}
            </p>
          </div>
        </Fade>

        {/* Price */}
        <Fade delay={360} duration={700}>
          <div style={{ paddingTop: 18, textAlign: "center" }}>
            <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: palette.ink, margin: 0 }}>
              ${piece.price}
            </p>
          </div>
        </Fade>

        {/* Story */}
        <Fade delay={460} duration={700}>
          <div style={{ paddingTop: 28 }}>
            <div style={{ width: 16, borderBottom: `0.5px solid ${palette.ceramicDark}`, margin: "0 auto 22px" }} />
            <p style={{ fontFamily: serif, fontSize: 15, color: palette.textQuiet, lineHeight: 1.9, textAlign: "center", margin: 0 }}>
              {piece.story}
            </p>
          </div>
        </Fade>

        {/* CTA */}
        <Fade delay={560} duration={700}>
          <div style={{ paddingTop: 36 }}>
            <button onClick={handleAdd} style={{
              display: "block", width: "100%",
              background: added ? palette.celadonMute : palette.ink,
              color: palette.warmWhite, border: "none", padding: "19px 0",
              fontFamily: sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
              cursor: "pointer", borderRadius: 0, transition: "background 600ms ease",
            }}>
              {added ? "Added to Bag  ✓" : "Bring This Home"}
            </button>
          </div>
        </Fade>

        {/* Fulfillment */}
        <Fade delay={640} duration={700}>
          <div style={{ paddingTop: 16, paddingBottom: 64, textAlign: "center" }}>
            <p style={{ fontFamily: serif, fontSize: 13, fontStyle: "italic", color: palette.fog, lineHeight: 1.75, margin: 0 }}>
              {piece.fulfillment}
            </p>
          </div>
        </Fade>

      </div>
    </div>
  );
}

// ─── BAG ───────────────────────────────────────────────────────

function Bag({ bag, onBack, onRemove, onCheckout, total }) {
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);
  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic }}>
      <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `0.5px solid ${palette.ceramicDark}` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>← Continue</button>
        <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink, letterSpacing: "0.07em" }}>mesa</span>
        <span style={{ minWidth: 40 }} />
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "44px 24px" }}>
        <Fade delay={60}><p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: palette.imperial, marginBottom: 36 }}>Your Bag</p></Fade>
        {bag.length === 0 ? (
          <Fade delay={120}><p style={{ fontFamily: serif, fontSize: 18, fontStyle: "italic", color: palette.fog, textAlign: "center", padding: "64px 0" }}>Nothing here yet.</p></Fade>
        ) : (
          <Fade delay={120}>
            <div>
              {bag.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 0", borderBottom: `0.5px solid ${palette.ceramicDark}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 40% 35%, ${item.glazeColor}cc, ${item.glazeColor}88)` }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: serif, fontSize: 15, fontWeight: 400, color: palette.ink, margin: "0 0 3px" }}>{item.name}</h4>
                    <p style={{ fontFamily: sans, fontSize: 9, color: palette.fog, margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.glaze} · Qty {item.qty}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: palette.text }}>${(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => onRemove(item.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", padding: "5px 0 0", marginLeft: "auto", fontFamily: sans, fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: palette.fog }}>Remove</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0" }}>
                <span style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>Total</span>
                <span style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: palette.ink }}>${total.toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} style={{ display: "block", width: "100%", background: palette.ink, color: palette.warmWhite, padding: "19px 0", fontFamily: sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 0 }}>Checkout</button>
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}

// ─── CHECKOUT ──────────────────────────────────────────────────

function Checkout({ bag, total, name, email, addr, city, zip, setName, setEmail, setAddr, setCity, setZip, onBack, onConfirm }) {
  const ready = name && email && addr && city && zip;
  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic }}>
      <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `0.5px solid ${palette.ceramicDark}` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>← Back to Bag</button>
        <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink, letterSpacing: "0.07em" }}>mesa</span>
        <span style={{ minWidth: 40 }} />
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "44px 24px 64px" }}>
        <Fade delay={60}><p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: palette.imperial, marginBottom: 36 }}>Shipping</p></Fade>
        <Fade delay={180}>
          <div>
            <Field lbl="Full Name" value={name} onChange={setName} placeholder="Jane Smith" />
            <Field lbl="Email" value={email} onChange={setEmail} placeholder="jane@email.com" type="email" />
            <Field lbl="Shipping Address" value={addr} onChange={setAddr} placeholder="123 Main St, Apt 4" />
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <Field lbl="City" value={city} onChange={setCity} placeholder="San Francisco" />
              <Field lbl="Zip" value={zip} onChange={setZip} placeholder="94110" />
            </div>
          </div>
        </Fade>
        <Fade delay={300}>
          <div style={{ borderTop: `0.5px solid ${palette.ceramicDark}`, paddingTop: 28, marginTop: 4 }}>
            {bag.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: serif, fontSize: 14, color: palette.textQuiet }}>{item.name} × {item.qty}</span>
                <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: palette.text }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0 28px", borderTop: `0.5px solid ${palette.ceramicDark}`, marginTop: 16 }}>
              <span style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>Total</span>
              <span style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: palette.ink }}>${total.toFixed(2)}</span>
            </div>
            <button onClick={ready ? onConfirm : undefined} style={{ display: "block", width: "100%", background: palette.ink, color: palette.warmWhite, padding: "19px 0", fontFamily: sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", border: "none", cursor: ready ? "pointer" : "default", borderRadius: 0, opacity: ready ? 1 : 0.28, transition: "opacity 500ms ease" }}>Place Order</button>
          </div>
        </Fade>
      </div>
    </div>
  );
}

// ─── CONFIRMED ─────────────────────────────────────────────────

function Confirmed({ name, email, total, onDone }) {
  const firstName = name.split(" ")[0] || "you";
  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "64px 32px", maxWidth: 380 }}>
        <Fade delay={200}><div style={{ width: 24, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 40px" }} /></Fade>
        <Fade delay={420}><p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: palette.celadonMute, marginBottom: 20 }}>Order Placed</p></Fade>
        <Fade delay={620}><h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 400, color: palette.ink, margin: "0 0 22px" }}>Thank you, {firstName}.</h2></Fade>
        <Fade delay={820}>
          <p style={{ fontFamily: serif, fontSize: 16, fontStyle: "italic", color: palette.textQuiet, lineHeight: 1.85, margin: "0 0 10px" }}>
            Your pieces will arrive wrapped in linen, with a note from Chef Brandon Jew.
          </p>
          <p style={{ fontFamily: sans, fontSize: 11, color: palette.fog, margin: "0 0 32px" }}>Confirmation sent to {email}</p>
        </Fade>
        <Fade delay={1020}><p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: palette.ink, margin: "0 0 40px" }}>${total.toFixed(2)}</p></Fade>
        <Fade delay={1220}>
          <div style={{ width: 16, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 22px" }} />
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.15em", color: palette.fog, marginBottom: 36 }}>Mister Jiu's earns a share of this purchase</p>
          <button onClick={onDone} style={{ background: palette.ink, color: palette.warmWhite, border: "none", padding: "16px 52px", fontFamily: sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", cursor: "pointer", borderRadius: 0 }}>Done</button>
        </Fade>
      </div>
    </div>
  );
}
