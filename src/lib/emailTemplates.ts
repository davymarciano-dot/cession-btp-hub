export const emailTemplates = {
  boostUpsell: (data: {
    name: string;
    listingTitle: string;
    views: number;
    daysActive: number;
    discount: number;
    boostUrl: string;
    unsubscribeUrl: string;
  }) => ({
    subject: `🚀 ${data.name}, votre annonce mérite plus de visibilité`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { padding: 40px; }
          .alert-box { background: #fee; border-left: 4px solid #f44; padding: 20px; margin: 20px 0; }
          .stats { display: flex; justify-content: space-around; margin: 30px 0; }
          .stat { text-align: center; }
          .stat-value { font-size: 36px; font-weight: bold; color: #333; }
          .stat-label { color: #666; margin-top: 5px; }
          .cta-button { display: inline-block; background: #f7931e; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-size: 18px; font-weight: bold; }
          .discount-badge { background: #4caf50; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; }
          .footer { background: #333; color: #999; padding: 30px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Votre annonce n'est pas assez visible</h1>
          </div>
          
          <div class="content">
            <p>Bonjour ${data.name},</p>
            
            <div class="alert-box">
              <strong>⚠️ Alerte Performance</strong><br>
              Votre annonce "${data.listingTitle}" n'atteint pas son potentiel
            </div>
            
            <div class="stats">
              <div class="stat">
                <div class="stat-value">${data.views}</div>
                <div class="stat-label">Vos vues</div>
              </div>
              <div class="stat">
                <div class="stat-value">47</div>
                <div class="stat-label">Moyenne marché</div>
              </div>
              <div class="stat">
                <div class="stat-value">${data.daysActive}j</div>
                <div class="stat-label">En ligne depuis</div>
              </div>
            </div>
            
            <h2>Les annonces boostées se vendent 2x plus vite</h2>
            
            <p>✅ Position #1 dans les résultats<br>
            ✅ Badge "À la une"<br>
            ✅ Email à 500+ acheteurs qualifiés<br>
            ✅ +300% de visibilité garantie</p>
            
            <div style="text-align: center;">
              <div class="discount-badge">🎁 OFFRE EXCLUSIVE : -${data.discount}% (48h)</div><br>
              <a href="${data.boostUrl}" class="cta-button">Booster mon annonce →</a>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              <strong>Témoignage :</strong> "J'ai boosté mon annonce et vendu en 15 jours !" - Jean D., Plombier
            </p>
          </div>
          
          <div class="footer">
            CessionBTP • Leader de la cession BTP<br>
            <a href="${data.unsubscribeUrl}" style="color: #999;">Se désabonner</a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  cartRecovery: (data: {
    userName: string;
    productName: string;
    price: number;
    recoveryUrl: string;
    discount?: number;
  }) => ({
    subject: data.discount 
      ? `⏰ -${data.discount}% sur votre panier (24h seulement)`
      : '🛒 Vous avez oublié quelque chose !',
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: auto;">
        ${data.discount ? `
          <div style="background: #FFF3E0; padding: 20px; border-left: 4px solid #FF9800;">
            <h2>🎁 Offre spéciale : -${data.discount}% de réduction</h2>
          </div>
        ` : `
          <h2>Finalisez votre achat en 1 clic</h2>
        `}
        
        <p>Bonjour ${data.userName},</p>
        <p>Vous étiez à quelques secondes de ${data.productName} !</p>
        
        <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3>${data.productName}</h3>
          ${data.discount ? `
            <p style="text-decoration: line-through; color: #999;">${data.price}€</p>
            <p style="font-size: 24px; color: #4CAF50;">${Math.round(data.price * (1 - data.discount / 100))}€</p>
          ` : `
            <p style="font-size: 24px; color: #4CAF50;">${data.price}€</p>
          `}
        </div>
        
        <a href="${data.recoveryUrl}" style="display: inline-block; background: ${data.discount ? '#FF9800' : '#4CAF50'}; color: white; padding: 15px 30px; border-radius: 5px; text-decoration: none;">
          ${data.discount ? 'Profiter de -' + data.discount + '% maintenant' : 'Finaliser mon achat →'}
        </a>
        
        <p style="margin-top: 20px; color: #666;">
          💡 Besoin d'aide ? Répondez à cet email ou appelez le 01 23 45 67 89
        </p>
      </div>
    `
  }),

  matchFound: (data: {
    sellerName: string;
    matchCount: number;
    viewUrl: string;
  }) => ({
    subject: `🎯 ${data.matchCount} acheteurs intéressés par votre entreprise !`,
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1>Excellente nouvelle !</h1>
        </div>
        
        <div style="padding: 30px;">
          <p>Bonjour ${data.sellerName},</p>
          
          <div style="background: #E8F5E9; border: 2px solid #4CAF50; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #4CAF50; margin: 0;">🎯 ${data.matchCount} acheteurs correspondent à votre profil</h2>
          </div>
          
          <p>Notre IA a identifié des acheteurs sérieux qui recherchent exactement une entreprise comme la vôtre.</p>
          
          <h3>Profils des acheteurs :</h3>
          <ul>
            <li>✅ Budget validé par leur banque</li>
            <li>✅ Expérience dans votre secteur</li>
            <li>✅ Localisation compatible</li>
            <li>✅ Prêts à acheter rapidement</li>
          </ul>
          
          <a href="${data.viewUrl}" style="display: inline-block; background: #4CAF50; color: white; padding: 15px 40px; border-radius: 50px; text-decoration: none; font-size: 18px;">
            Voir les acheteurs matchés →
          </a>
          
          <p style="margin-top: 30px; padding: 15px; background: #FFF3E0; border-radius: 5px;">
            💡 <strong>Conseil :</strong> Répondez rapidement aux acheteurs intéressés. Les entreprises qui répondent en -24h ont 3x plus de chances de vendre.
          </p>
        </div>
      </div>
    `
  })
};

export type EmailTemplate = keyof typeof emailTemplates;
