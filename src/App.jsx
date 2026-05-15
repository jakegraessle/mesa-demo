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
    story: "The Rim line is defined by its raised edge — a subtle frame for whatever is placed upon it. The Sand glaze is neutral in the best sense: it holds space without competing.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
];

function Fade({ children, delay = 0, duration = 800 }) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(10px)",
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
    }, 350);
  };

  const addToBag = (p) => {
    const exists = bag.find(i => i.id === p.id);
    if (exists) setBag(bag.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    else setBag([...bag, { ...p, qty: 1 }]);
  };

  const removeBag = (id) => setBag(bag.filter(i => i.id !== id));
  const total = bag.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ opacity: trans ? 0 : 1, transition: "opacity 350ms ease", minHeight: "100vh", background: palette.ceramic }}>
      {view === "gallery" && <Gallery pieces={pieces} bag={bag} onSelect={p => go("detail", p)} onBag={() => go("bag")} />}
      {view === "detail" && activePiece && <Detail piece={activePiece} bag={bag} onBack={() => go("gallery")} onAdd={p => addToBag(p)} onBag={() => go("bag")} />}
      {view === "bag" && <Bag bag={bag} onBack={() => go("gallery")} onRemove={removeBag} onCheckout={() => go("checkout")} total={total} />}
      {view === "checkout" && <Checkout bag={bag} total={total} name={name} email={email} addr={addr} city={city} zip={zip} setName={setName} setEmail={setEmail} setAddr={setAddr} setCity={setCity} setZip={setZip} onBack={() => go("bag")} onConfirm={() => go("confirmed")} />}
      {view === "confirmed" && <Confirmed name={name} email={email} total={total} onDone={() => { setBag([]); setName(""); setEmail(""); setAddr(""); setCity(""); setZip(""); go("gallery"); }} />}
    </div>
  );
}

// ─── NAV — shared, always mesa + Bag only ──────────────────────

function Nav({ onBag, bagCount, onBack, label }) {
  return (
    <div style={{
      padding: "18px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: `0.5px solid ${palette.ceramicDark}`,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>
          ← {label || "Back"}
        </button>
      ) : (
        <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink, letterSpacing: "0.08em" }}>mesa</span>
      )}

      {!onBack && <span style={{ fontFamily: serif, fontSize: 14, color: palette.ink, letterSpacing: "0.08em", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>mesa</span>}

      <button onClick={onBag} style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
        color: bagCount > 0 ? palette.ink : palette.fog,
      }}>
        Bag{bagCount > 0 ? ` · ${bagCount}` : ""}
      </button>
    </div>
  );
}

// ─── GALLERY ───────────────────────────────────────────────────

function Gallery({ pieces, bag, onSelect, onBag }) {
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic }}>

      <Nav onBag={onBag} bagCount={bagCount} />

      {/* Hero header — restaurant name lives here, not in nav */}
      <Fade delay={80} duration={900}>
        <div style={{ textAlign: "center", padding: "64px 28px 56px" }}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.32em",
            textTransform: "uppercase", color: palette.celadonMute, margin: "0 0 16px",
          }}>
            On Your Table at
          </p>
          <h1 style={{
            fontFamily: serif, fontSize: 46, fontWeight: 400,
            color: palette.ink, margin: "0 0 8px", letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}>
            Mister Jiu's
          </h1>
          <p style={{ fontFamily: sans, fontSize: 10, color: palette.fog, letterSpacing: "0.1em", margin: "0 0 24px" }}>
            Chinatown · San Francisco
          </p>
          <div style={{ width: 20, borderBottom: `0.5px solid ${palette.ceramicDark}`, margin: "0 auto 24px" }} />
          <p style={{
            fontFamily: serif, fontSize: 15, fontStyle: "italic",
            color: palette.textQuiet, lineHeight: 1.8, maxWidth: 300, margin: "0 auto",
          }}>
            Hand-thrown in Sausalito. Glazed in the colors of the fog.
          </p>
        </div>
      </Fade>

      {/* Editorial grid — hero / pair / hero / pair */}
      <Fade delay={240} duration={900}>
        <div style={{ padding: "0 28px" }}>

          {/* Hero — Bowl */}
          <PieceThumb piece={pieces[0]} onSelect={onSelect} large />

          {/* Pair — Cup + Serving Dish */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 48 }}>
            <PieceThumb piece={pieces[1]} onSelect={onSelect} />
            <PieceThumb piece={pieces[2]} onSelect={onSelect} />
          </div>

          {/* Hero — Platter */}
          <div style={{ marginTop: 64 }}>
            <PieceThumb piece={pieces[3]} onSelect={onSelect} large />
          </div>

          {/* Pair — Dinner Plate + Salad Plate */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 48 }}>
            <PieceThumb piece={pieces[4]} onSelect={onSelect} />
            <PieceThumb piece={pieces[5]} onSelect={onSelect} />
          </div>

        </div>
      </Fade>

      {/* Quote */}
      <Fade delay={400} duration={800}>
        <div style={{ padding: "80px 28px 32px", textAlign: "center" }}>
          <div style={{ width: 20, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 36px" }} />
          <p style={{
            fontFamily: serif, fontSize: 18, fontStyle: "italic",
            color: palette.ink, lineHeight: 1.85, maxWidth: 360, margin: "0 auto",
          }}>
            "Color, texture, and shape — it all comes together to make a dish feel complete."
          </p>
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.imperial, marginTop: 20 }}>
            Brandon Jew · Chef & Owner
          </p>
        </div>
      </Fade>

      {/* Footer */}
      <div style={{ padding: "36px 28px 52px", textAlign: "center", borderTop: `0.5px solid ${palette.ceramicDark}`, marginTop: 36 }}>
        <span style={{ fontFamily: serif, fontSize: 12, color: palette.fog, letterSpacing: "0.07em" }}>mesa</span>
        <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.1em", color: palette.fog, margin: "8px 0 0" }}>
          Mister Jiu's earns a share of every purchase
        </p>
      </div>

    </div>
  );
}

// ─── PIECE THUMBNAIL ───────────────────────────────────────────
// Products sit directly on the cream page — no frames, no boxes.
// mix-blend-mode: multiply drops out the white photo backgrounds.

function PieceThumb({ piece, onSelect, large = false }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onSelect(piece)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Image — no background container, multiply erases white */}
      <div style={{
        width: "100%",
        aspectRatio: large ? "16 / 10" : "4 / 5",
        position: "relative",
        overflow: "hidden",
      }}>
        <img
          src={piece.image}
          alt={piece.name}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            transition: "transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease",
            transform: hover ? "scale(1.03)" : "scale(1)",
            opacity: hover ? 0.85 : 1,
          }}
        />
      </div>

      {/* Typography — name serif, then glaze · price in one quiet line */}
      <div style={{ paddingTop: large ? 18 : 14, paddingBottom: large ? 0 : 0 }}>
        <h3 style={{
          fontFamily: serif,
          fontSize: large ? 17 : 14,
          fontWeight: 400,
          color: palette.ink,
          margin: "0 0 6px",
          letterSpacing: "0.01em",
        }}>
          {piece.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: sans, fontSize: 9, color: palette.fog, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {piece.glaze}
          </span>
          <span style={{ fontFamily: sans, fontSize: 9, color: palette.ceramicDark }}>·</span>
          <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: palette.textQuiet }}>
            ${piece.price}
          </span>
        </div>
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

      <Nav onBag={onBag} bagCount={bagCount} onBack={onBack} label="Back" />

      {/* Hero image — product floats on cream */}
      <Fade delay={60} duration={700}>
        <div style={{ padding: "0 28px", marginTop: 40 }}>
          <div style={{ width: "100%", aspectRatio: "4 / 3", position: "relative" }}>
            <img
              src={piece.image}
              alt={piece.name}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
      </Fade>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 28px" }}>

        {/* Identity */}
        <Fade delay={200} duration={700}>
          <div style={{ paddingTop: 32, textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: palette.celadonMute, margin: "0 0 10px" }}>
              {piece.glaze} · Heath Ceramics
            </p>
            <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 400, color: palette.ink, margin: "0 0 18px", letterSpacing: "0.01em" }}>
              {piece.name}
            </h2>
            <p style={{ fontFamily: serif, fontSize: 17, fontStyle: "italic", color: palette.textQuiet, lineHeight: 1.8, margin: 0 }}>
              {piece.poem}
            </p>
          </div>
        </Fade>

        {/* Price */}
        <Fade delay={320} duration={700}>
          <div style={{ paddingTop: 20, textAlign: "center" }}>
            <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: palette.ink, margin: 0 }}>
              ${piece.price}
            </p>
          </div>
        </Fade>

        {/* Story */}
        <Fade delay={440} duration={700}>
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
              {added ? "Added  ✓" : "Bring This Home"}
            </button>
          </div>
        </Fade>

        {/* Fulfillment */}
        <Fade delay={660} duration={700}>
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
      <Nav onBag={() => {}} bagCount={bagCount} onBack={onBack} label="Continue Browsing" />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "44px 28px" }}>
        <Fade delay={60}>
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: palette.imperial, marginBottom: 36 }}>Your Bag</p>
        </Fade>
        {bag.length === 0 ? (
          <Fade delay={120}>
            <p style={{ fontFamily: serif, fontSize: 18, fontStyle: "italic", color: palette.fog, textAlign: "center", padding: "64px 0" }}>Nothing here yet.</p>
          </Fade>
        ) : (
          <Fade delay={120}>
            <div>
              {bag.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 0", borderBottom: `0.5px solid ${palette.ceramicDark}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 40% 35%, ${item.glazeColor}cc, ${item.glazeColor}88)` }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: serif, fontSize: 15, fontWeight: 400, color: palette.ink, margin: "0 0 4px" }}>{item.name}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: sans, fontSize: 9, color: palette.fog, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.glaze}</span>
                      <span style={{ fontFamily: sans, fontSize: 9, color: palette.ceramicDark }}>·</span>
                      <span style={{ fontFamily: sans, fontSize: 9, color: palette.fog }}>Qty {item.qty}</span>
                    </div>
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
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);
  return (
    <div style={{ minHeight: "100vh", background: palette.ceramic }}>
      <Nav onBag={() => {}} bagCount={bagCount} onBack={onBack} label="Back to Bag" />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "44px 28px 64px" }}>
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
          <p style={{ fontFamily: serif, fontSize: 16, fontStyle: "italic", color: palette.textQuiet, lineHeight: 1.85, margin: "0 0 10px" }}>Your pieces will arrive wrapped in linen, with a note from Chef Brandon Jew.</p>
          <p style={{ fontFamily: sans, fontSize: 11, color: palette.fog, margin: "0 0 28px" }}>Confirmation sent to {email}</p>
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
