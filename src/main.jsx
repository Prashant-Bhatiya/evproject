import React,{useEffect,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import{BrowserRouter,Routes,Route,NavLink}from'react-router-dom';
import'./styles.css';
const A='/assets/';

function Header(){
  const[open,setOpen]=useState(false);
  const links=['solutions','products','technology','partners','resources','contact'];
  return <header className='siteHeader'>
    <div className='headerInner'>
      <NavLink to='/' className='brand' onClick={()=>setOpen(false)}><img src={A+'axion-logo.png'} alt='AXION CHARGE'/></NavLink>
      <nav className={'mainNav '+(open?'open':'')}>{links.map(x=><NavLink key={x} to={'/'+x} onClick={()=>setOpen(false)}>{x}</NavLink>)}<NavLink to='/contact' className='mobileQuoteBtn' onClick={()=>setOpen(false)}>Request a Quote <span>→</span></NavLink></nav>
      <div className='headerActions'>
        <NavLink to='/contact' className='quoteBtn'>Request a Quote</NavLink>
        <button className={'menuBtn '+(open?'open':'')} onClick={()=>setOpen(v=>!v)} aria-label='Toggle navigation' aria-expanded={open}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
}

function MatrixRain(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d');
    let raf,drops=[],speeds=[],highlights=[],w=0,h=0,lastFrame=0;
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const featured=['AXION CHARGE','3.3 KW SMART AC','7.4 KW SMART AC','11 KW','22 KW','DC FAST'];
    const fontSize=17,columnWidth=22;
    const resize=()=>{
      const rect=canvas.parentElement.getBoundingClientRect();
      w=Math.ceil(rect.width);h=Math.ceil(rect.height);
      canvas.width=w;canvas.height=h;canvas.style.width=w+'px';canvas.style.height=h+'px';
      const count=Math.ceil(w/columnWidth);
      drops=Array.from({length:count},()=>Math.floor(Math.random()*-(h/fontSize)));
      speeds=Array.from({length:count},()=>.72+Math.random()*.38);
      const featuredCount=Math.min(featured.length,Math.max(3,Math.floor(w/230)));
      highlights=Array.from({length:featuredCount},(_,i)=>({text:featured[i%featured.length],x:0,y:-80-Math.random()*h,speed:1.15+Math.random()*.7,phase:Math.random()*Math.PI*2}));
      highlights.forEach((item,i)=>{const band=w/highlights.length;item.x=band*i+band/2});
      ctx.fillStyle='#020604';ctx.fillRect(0,0,w,h);
    };
    const draw=(time=0)=>{
      raf=requestAnimationFrame(draw);
      if(time-lastFrame<33)return;
      lastFrame=time;
      ctx.shadowBlur=0;ctx.fillStyle='rgba(2,6,4,.075)';ctx.fillRect(0,0,w,h);
      ctx.font=`600 ${fontSize}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`;
      ctx.textAlign='center';ctx.fillStyle='rgba(24,255,104,.22)';
      for(let i=0;i<drops.length;i++){
        const text=chars.charAt(Math.floor(Math.random()*chars.length));
        const x=i*columnWidth+columnWidth/2,y=drops[i]*fontSize;
        ctx.fillText(text,x,y);
        if(y>h&&Math.random()>.975){drops[i]=0;speeds[i]=.72+Math.random()*.38}
        drops[i]+=speeds[i];
      }
      ctx.font=`800 ${w<700?13:15}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`;
      ctx.shadowColor='#00ff66';ctx.shadowBlur=10;
      highlights.forEach((item,i)=>{
        item.y+=item.speed;
        const pulse=.78+Math.sin(time*.0025+item.phase)*.18;
        ctx.fillStyle=`rgba(126,255,161,${pulse})`;
        ctx.fillText(item.text,item.x,item.y);
        if(item.y>h+30){item.y=-50-Math.random()*220;item.speed=1.15+Math.random()*.7;item.text=featured[(featured.indexOf(item.text)+highlights.length)%featured.length]}
      });
      ctx.shadowBlur=0;
    };
    resize();window.addEventListener('resize',resize);draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)};
  },[]);
  return <canvas ref={ref} className='matrixRain' aria-hidden='true'/>;
}

function Footer(){const goTop=()=>window.scrollTo({top:0,behavior:'smooth'});const Link=({to,children})=><NavLink to={to} onClick={goTop}>{children}</NavLink>;return <footer className='siteFooter'><div className='footerInner'><div className='footerBrand'><img src={A+'axion-logo.png'} alt='AXION CHARGE'/><span>ENERGY : EVOLVED</span><p>Building India's next-generation EV charging ecosystem — premium hardware, intelligent software and a partner-led national network.</p><div className='footerContact'><a href='tel:+919979993397'>+91 99799 93397</a><span> · </span><a href='tel:+919979993396'>+91 99799 93396</a><a href='tel:+919879885551'>+91 98798 85551</a><a href='mailto:info@axioncharge.com'>info@axioncharge.com</a><a href='https://www.axioncharge.com' target='_blank' rel='noreferrer'>www.axioncharge.com</a></div><div className='footerSocials'><a href='https://www.linkedin.com/company/axion-charge/' target='_blank' rel='noreferrer' aria-label='AXION CHARGE on LinkedIn'>in</a><a href='https://www.instagram.com/axioncharge/' target='_blank' rel='noreferrer' aria-label='AXION CHARGE on Instagram'>◎</a><a href='https://x.com/axioncharge' target='_blank' rel='noreferrer' aria-label='AXION CHARGE on X'>𝕏</a><a href='https://www.youtube.com/@axioncharge' target='_blank' rel='noreferrer' aria-label='AXION CHARGE on YouTube'>▶</a></div></div><div className='footerNav'><div><b>Products</b><Link to='/products'>3.3 kW Smart AC</Link><Link to='/products'>7.4 kW Smart AC</Link><Link to='/products'>11 kW (roadmap)</Link><Link to='/products'>22 kW (roadmap)</Link><Link to='/products'>DC Fast (roadmap)</Link></div><div><b>Solutions</b><Link to='/solutions'>Residential</Link><Link to='/solutions'>Apartments & RWAs</Link><Link to='/solutions'>Builders</Link><Link to='/solutions'>Commercial</Link><Link to='/solutions'>Fleet charging</Link></div><div><b>Company</b><Link to='/technology'>About AXION CHARGE</Link><Link to='/technology'>Roadmap</Link><Link to='/partners'>Careers</Link><Link to='/resources'>Resources</Link></div><div><b>Support</b><Link to='/contact'>Request a quote</Link><Link to='/contact'>Installation</Link><Link to='/contact'>Service & maintenance</Link><Link to='/contact'>Contact</Link></div></div><div className='footerBottom'><small>© 2026 AXION CHARGE. All rights reserved.</small><div><Link to='/privacy'>Privacy Policy</Link><Link to='/terms'>Terms of Service</Link><Link to='/legal'>Legal</Link></div></div></div></footer>}
const Layout=({children})=><><Header/>{children}<Footer/></>;
const Section=({eyebrow,title,children})=><section><div className='wrap'><span className='eyebrow'>{eyebrow}</span><h2>{title}</h2>{children}</div></section>;
function Home(){let cards=[['Future Ready','Architecture designed for higher-power and DC upgrades.'],['Premium Hardware','Components for safety, heat and load conditions in India.'],['Smart Software','Cloud CMS with monitoring, access control and reporting.'],['Professional Installation','Trained installation partners and documented handover.'],['Dedicated Support','Round-the-clock technical assistance for every deployment.'],['Reliable Technology','Tested firmware with OTA updates and remote diagnostics.'],['Scalable Infrastructure','Add chargers site by site without re-engineering the system.'],['Made for India','Built around Indian grids, parking layouts and usage patterns.']];return <Layout><main className='hero'><MatrixRain/><div className='heroShade'></div><div className='heroInner'><div className='heroText'><span className='eyebrow pill'>⚡ Energy : Evolved · India</span><h1>Powering India's<br/><em>Electric Future.</em></h1><p>Premium EV charging infrastructure for homes, businesses and smart communities — intelligent hardware, cloud management software and installation you can trust.</p><div className='actions'><NavLink to='/contact'>Get Started <span>→</span></NavLink><NavLink to='/partners' className='ghost'>Become a Partner</NavLink><NavLink to='/products' className='textLink'>Explore Products</NavLink></div><div className='heroMiniStats'>{[['3.3 – 7.4 kW','Smart AC range'],['OCPP','Ready architecture'],['24×7','Technical support']].map(([a,b])=><div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></div><div className='heroVisual'><img src={A+'hero-charger.jpg'} alt='AXION CHARGE smart EV charger'/><div className='liveCard'><small>LIVE SESSION</small><strong>7.4 <span>kW</span></strong><i></i></div></div></div></main><div className='stats landingStats'>{[['3+','Verticals ready to deploy'],['25+','Cities targeted'],['100%','Partner-led expansion'],['24×7','Technical support']].map(([a,b])=><div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div><Section eyebrow='Why AXION CHARGE' title='Engineered for trust, built for scale.'><div className='grid'>{cards.map(c=><article key={c[0]}><h3>{c[0]}</h3><p>{c[1]}</p></article>)}</div></Section><Section eyebrow='How it works' title='From first call to live charging.'><div className='steps'>{['Consultation','Site Survey','Proposal','Installation','Activation','Support'].map((x,i)=><article key={x}><small>STEP 0{i+1}</small><h3>{x}</h3></article>)}</div></Section></Layout>}
function Solutions(){let x=['Residential Charging','Apartment Solutions','Builder Solutions','Workplace Charging','Commercial Charging','Fleet Charging','Dealer Network','Distributor Program','Franchise Opportunities'];return <Layout><Section eyebrow='Solutions' title='One infrastructure partner for every charging need.'><p>From a single home charger to a nationwide network, AXION CHARGE designs, installs and manages charging that scales with you.</p><div className='grid'>{x.map(v=><article key={v}><h3>{v}</h3><p>Purpose-built EV charging solutions with intelligent monitoring and professional deployment.</p><NavLink to='/contact'>Talk to us →</NavLink></article>)}</div></Section><div className='imageSplit'><img src={A+'residential.jpg'}/><img src={A+'commercial.jpg'}/></div></Layout>}
const products=[['3.3','230V single phase','Type 2 / IEC 60309','product-3kw.jpg'],['7.4','230V single phase','Type 2 tethered','product-7kw.jpg'],['11','400V three phase','Type 2','product-11kw.jpg'],['22','400V three phase','Type 2 tethered','product-11kw.jpg'],['30','400V three phase','CCS2 / CHAdeMO','product-dc.jpg'],['60','400V three phase','CCS2 / CHAdeMO','product-dc.jpg'],['90','400V three phase','CCS2 / CHAdeMO','product-dc.jpg'],['120','400V three phase','CCS2 / CHAdeMO','product-dc.jpg'],['180','400V three phase','CCS2 / CHAdeMO','product-dc.jpg'],['220','400V three phase','CCS2 / CHAdeMO','product-dc.jpg']];
function Products(){return <Layout><Section eyebrow='Products' title='Premium hardware. Intelligent software. Zero compromise.'><p>Smart AC and DC chargers engineered for Indian conditions, backed by our cloud management system.</p><div className='products'>{products.map((p,i)=><article key={p[0]}><img src={A+p[3]}/><small>{i<4?'Smart AC Charger':'DC Fast Charger'}</small><h3>AXION {p[0]} kW</h3><p><b>Output</b> {p[0]} kW<br/><b>Input</b> {p[1]}<br/><b>Connector</b> {p[2]}<br/><b>{i<4?'Ingress':'Cooling'}</b> {i<4?'IP54 rated':i<7?'Air cooled':'Liquid cooled'}</p><NavLink to='/contact'>Request pricing</NavLink></article>)}</div></Section></Layout>}
function Technology(){return <Layout><Section eyebrow='Technology' title='The software layer behind every charge.'><p>Our cloud management system turns hardware into a managed network — visibility, control and reporting from one dashboard.</p><div className='dashboard'><h3>Axion CMS · Live</h3><div className='stats'><div><strong>18</strong><span>Active</span></div><div><strong>412 kWh</strong><span>Energy today</span></div><div><strong>99.4%</strong><span>Uptime</span></div></div><p>Energy Analytics · Remote Control · Live Status · Reports · RFID · User Management · OTA Updates</p></div></Section><Section eyebrow='Roadmap' title='Where AXION CHARGE is heading.'><div className='steps'>{['Residential deployments','Commercial rollout','Dealer network','Franchise network','Smart energy platform','National charging network'].map((x,i)=><article key={x}><small>{i<2?'Now':i<4?'Next':i===4?'Later':'Vision'}</small><h3>{x}</h3></article>)}</div></Section></Layout>}
function Partners(){let a=['Builder Partner','Distributor','Dealer','Franchise','Electrical Contractor','Service Partner'];return <Layout><Section eyebrow='Partner with us' title='Build the network with AXION CHARGE.'><p>We are expanding through partners who know their markets. Choose the role that fits your business.</p><div className='grid'>{a.map(x=><article key={x}><h3>{x}</h3><p>Grow with AXION CHARGE through a supported partner model.</p><NavLink to='/contact'>Apply now →</NavLink></article>)}</div></Section></Layout>}
function Resources(){let a=['EV charging for apartments: what societies should plan for','Understanding EV charging norms and incentives in India','OCPP explained for building owners','Charging as a revenue line for commercial properties','AC vs DC charging: choosing the right power level','Managing site load with intelligent charging'];return <Layout><Section eyebrow='Resources' title='EV education, guides and policy notes.'><div className='grid'>{a.map(x=><article key={x}><small>Coming soon</small><h3>{x}</h3><p>Practical guidance for EV charging deployment and operations.</p></article>)}</div></Section></Layout>}
function Contact(){return <Layout><Section eyebrow='Contact' title="Let's power your next project."><div className='contact'><div><h3>GROWTH</h3><p>+91 99799 93397</p><h3>SYSTEMS</h3><p>+91 99799 93396</p><h3>NETWORKS</h3><p>+91 98798 85551</p><h3>Email</h3><p>info@axioncharge.com</p><h3>Office</h3><p>Gujarat, India</p></div><form onSubmit={e=>{e.preventDefault();alert('Demo form')}}><input placeholder='Full name'/><input placeholder='Phone number'/><input placeholder='Email address'/><input placeholder='City'/><select><option>Residential</option><option>Commercial</option><option>Partnership</option></select><button>Request a Quote</button><small>We respond to every enquiry within one business day.</small></form></div></Section></Layout>}
function LegalPage({type}){const copy={privacy:['Privacy Policy','We respect your privacy. Contact details submitted through this website are used only to respond to enquiries and provide requested services.'],terms:['Terms of Service','Information on this website is provided for general guidance. Product specifications, availability and commercial terms are confirmed in a formal AXION CHARGE proposal.'],legal:['Legal','AXION CHARGE names, branding, product information and website content are protected materials. For legal enquiries, contact info@axioncharge.com.']}[type];return <Layout><Section eyebrow='AXION CHARGE' title={copy[0]}><p>{copy[1]}</p></Section></Layout>}
function App(){return <Routes><Route path='/' element={<Home/>}/><Route path='/solutions' element={<Solutions/>}/><Route path='/products' element={<Products/>}/><Route path='/technology' element={<Technology/>}/><Route path='/partners' element={<Partners/>}/><Route path='/resources' element={<Resources/>}/><Route path='/contact' element={<Contact/>}/><Route path='/privacy' element={<LegalPage type='privacy'/>}/><Route path='/terms' element={<LegalPage type='terms'/>}/><Route path='/legal' element={<LegalPage type='legal'/>}/></Routes>};
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
