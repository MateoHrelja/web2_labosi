import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const [xssProtection, setXSSProtection] = useState(0);
  const [accessProtection, setAccessProtection] = useState(0);

  const [comment, setComment] = useState("I like trains, but not <script>alert('Hi!')</script> this model.");
  const [displayComment, setDisplayComment] = useState(null)

  const handleSubmit = async () => {
      try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.post(url, {
          comment
        }, {
          params: {
            xssProtection,
          },
        });

        const data = response.data;
        setDisplayComment(data['comment']);
        setComment('')
      } catch (error) {
        console.error('Error submitting form:', error);
      }
  };

  return (
    <div>
      <h1>2nd Lab assignment for Web2</h1>
      <hr />
      <div>
        <label>
          Use protection against XSS
          <input type="checkbox" checked={xssProtection} onChange={() => setXSSProtection((1 - xssProtection))} />
        </label>
      </div>

      <div>
        <label>
          Use protection against broken access
          <input type="checkbox" checked={accessProtection} onChange={() => setAccessProtection((1 - accessProtection))} />
        </label>
      </div>
      <hr />

      <div>
        <h2>Submit a comment!</h2>
        <details>
            <summary>Upute za XSS:</summary>
            <ul>
                <li>Korisniku je omogućeno stvaranje nekakvog komentara, poruke ili sličnog konstrukta</li>
                <li>Zbog jednostavnosti, komentar se ne sprema na bazu ili negdje konkretno, nego se privremeno pohrani u memoriju</li>
                <li>Komentar postane dostupan u obliku klika na "spoiler" nakon što je <i>submittan</i>, klikom se može pročitati (u stvarnoj situaciji, prikazao bi se i drugim korisnicima itd.)</li>
                <li>Ako je isključena XSS zaštita, u naslov i tijelo moguće je slati svakakve spodobe, primjer stoji u <i>autofillu</i></li>
                <li><i>Napomena:</i> neke stvari ne rade kako zamišljeno jer React ima dosta striktna anti-XSS pravila, objašnjeno u izvještaju</li>
            </ul>
        </details>
        <br />
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: '500px' }} // Adjust the width and height as needed
          />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>

        {displayComment && (
          <details>
            <summary>View Comment:</summary>
              <p dangerouslySetInnerHTML={{ __html: `User commented: ${displayComment}` }}></p>
          </details>
        )}
      </div>

      <hr />

      <div>
        <h2>Check out your user details!</h2>
        <details>
            <summary>Upute za lošu kontrolu pristupa:</summary>
            <ul>
                <li>Korisnik može otići na stranicu s detaljima i pregledati svoje privatne informacije pritiskom na gumb ispod</li>
                <li>Demonstracije i jednostavnosti radi, prava autentifikacija ne postoji, "hardkodirano" je da je trenutno ulogiran korisnik s ID-jem 36</li>
                <li>Naravno, korisnik može primijetiti da na URLu piše .../user/36, te biti znatiželjan i pokušati pregledati informacije drugih korisnika</li>
                <li>Postoje još dva usera u bazi, s ID-jevima 35 i 37, kojima korisnik može pregledati informacije ako je isključena zaštita protiv loše kontrole pristupa</li>
                <li>Demonstracije i jednostavnosti radi, unutar same podstranice je zaštita za uključena kao <i>query param</i> u URL-u</li>
            </ul>
        </details>
      </div>
      <div>
          <Link to={`/users/36?accessProtection=${accessProtection}`}>
            <button>User Details</button>
          </Link>
        </div>
    </div>
  );
};

export default App;
