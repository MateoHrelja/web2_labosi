import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  const [xssProtection, setXSSProtection] = useState(0);
  const [accessProtection, setAccessProtection] = useState(0);

  const [post, setPost] = useState(null);

  const [title, setTitle] = useState('');
  const [displayPostTitle, setDisPlayPostTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
      try {
        // Send a POST request using axios
        const response = await axios.post('http://localhost:3001', {
          title,
          content,
        }, {
          params: {
            xssProtection,
          },
        });

        // Assuming the response contains the post data
        const data = response.data;

        // Update the post state
        setPost(data);

        console.log(data)

        // Clear the form
        setTitle('');
        setContent('');
        setDisPlayPostTitle(data['title'])
      } catch (error) {
        // Handle any errors
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
        <h2>Submit a post!</h2>
        <details>
            <summary>Upute za XSS:</summary>
            <ul>
                <li>Korisniku je omogućeno stvaranje nekakvog članka, forum posta ili sličnih konstrukata</li>
                <li>Zbog jednostavnosti, post se ne sprema na bazu ili negdje konkretno, nego se privremeno pohrani u memoriju</li>
                <li>Post postane dostupan u obliku linka nakon što je <i>submittan</i>, klikom se može pročitati</li>
                <li>Ako je isključena XSS zaštita, u naslov i tijelo moguće je slati svakakve spodobe, primjer stoji u <i>autofillu</i></li>
            </ul>
        </details>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>

        {post && (
          <div>
             <p dangerouslySetInnerHTML={{ __html: `Post ${displayPostTitle} created!` }}></p>
             <a href={`/posts`}>View Post</a>
          </div>
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
            </ul>
        </details>
      </div>
      <div>
        <button onClick={() => window.location.href = '/user/36'}>User Details</button>
      </div>
    </div>
  );
};

export default App;
