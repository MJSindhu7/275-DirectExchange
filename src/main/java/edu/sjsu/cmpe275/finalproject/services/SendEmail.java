package edu.sjsu.cmpe275.finalproject.services;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {
	public void sendMailfunc(String rec) throws MessagingException {
		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", "587");
		
		String myEmail = "";
		String password = "";
		
		Session session = Session.getInstance(properties, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication(myEmail, password);
				
			}
		});
		Message message = prepareMessage(session, myEmail, rec);
		
		Transport.send(message);
		System.out.println("Sent mail+++++++++++++");
	}

	private static Message prepareMessage(Session session, String email, String recepient) {
		Message message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(email));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
			message.setSubject("Direct Exchange Mail");
			message.setText("Heyyyy!!! First mail");
			return message;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
