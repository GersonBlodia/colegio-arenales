import "./FooterComponent.css";
import { MailPlus } from 'lucide-react';
import { PhoneCall } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Send } from 'lucide-react';

export const FooterComponent = () => {
    return (
        <div className="footer">
        <div className="footer-section">
        <h2 className="footer-title">evocode</h2>
        <p className="footer-text">Trabajamos con la pasión de asumir retos y crear sitios web innovadores para impulsar marcas en el mundo digital con creatividad.</p>
        <button className="about-button">Sobre nosotros</button>
        </div>

        <div className="footer-section">
        <h3 className="footer-title">Informe de novedades</h3>
        <p className="footer-text">Suscríbete a nuestro boletín para recibir  las últimas ofertas, noticias y novedades en tecnología.</p>
        <div className="newsletter">
            <input type="email" placeholder="Su correo electrónico" />
            <button className="send-button"><Send size={20}/></button>
        </div>
        <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={17} className="icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={17} className="icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube size={19} className="icon" />
            </a>
        </div>

        </div>

        <div className="footer-section">
        <h3 className="footer-title">Información oficial:</h3>

        <p className="footer-text icon-text"><MailPlus size={17} color="#1475f7"/> team.evocode@gmail.com</p>
        <p className="footer-text icon-text"><PhoneCall size={17} color="#1475f7"/> +51 922 196 988</p>
        <p><strong>Horario de atención:</strong></p>
        <p className="footer-text">Lunes a sábado: 8:00 a 17:00 horas, <br /> domingo: CERRADO</p>
        </div>

        <div className="footer-section">
        <h3 className="footer-title">Galería</h3>
        <div className="gallery">
            <img src="/images/gallery1.jpg" alt="Gallery 1" />
            <img src="/images/gallery2.jpg" alt="Gallery 2" />
            <img src="/images/gallery3.jpg" alt="Gallery 3" />
            <img src="/images/gallery4.jpg" alt="Gallery 4" />
            <img src="/images/gallery5.jpg" alt="Gallery 5" />
            <img src="/images/gallery6.jpg" alt="Gallery 6" />
        </div>
        </div>
        <div className="footer-bottom">
            <p>© 2025 Evocode – TechHouse. Todos los derechos reservados.</p>
        </div>
    </div>
    );
};

export default FooterComponent;
