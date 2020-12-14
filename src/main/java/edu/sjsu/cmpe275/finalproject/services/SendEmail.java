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
	public void sendMailfunc(String rec,String msg) {
		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", "587");
		
		String myEmail = "cmpe275de@gmail.com";
		String password = "cmpe275@directexchange";
		
		Session session = Session.getInstance(properties, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication(myEmail, password);
				
			}
		});
		Message message = prepareMessage(session, myEmail, rec,msg);
		
		try {
			Transport.send(message);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("Sent mail+++++++++++++");
	}

	private static Message prepareMessage(Session session, String email, String recepient,String msg) {
		Message message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(email));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
			message.setSubject("Direct Exchange Mail");
			message.setText(msg);
			return message;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
