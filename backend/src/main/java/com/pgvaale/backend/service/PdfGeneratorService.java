package com.pgvaale.backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfGeneratorService {

   public ByteArrayInputStream generateContractPdf(String userName, String userId, String roomNo, String price) {
    Document document = new Document(PageSize.A4, 50, 50, 50, 50); // margins
    ByteArrayOutputStream out = new ByteArrayOutputStream();

    try {
        PdfWriter.getInstance(document, out);
        document.open();

        // Fonts
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Font sectionTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.BLUE);
        Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
        Font italicFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 11);

        // Title
        Paragraph title = new Paragraph("ROOM BOOKING CONFIRMATION CONTRACT", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        // Intro
        Paragraph intro = new Paragraph("This legal agreement certifies that the following individual has successfully booked a room at PGVaale Rentals under the stated terms and conditions.", regularFont);
        intro.setAlignment(Element.ALIGN_JUSTIFIED);
        intro.setSpacingAfter(15);
        document.add(intro);

        // Divider
        Paragraph divider = new Paragraph("_________________________________________", regularFont);
        divider.setAlignment(Element.ALIGN_CENTER);
        divider.setSpacingBefore(10);
        divider.setSpacingAfter(10);
        document.add(divider);

        // User Details Section
        Paragraph detailsTitle = new Paragraph("User & Booking Details", sectionTitleFont);
        detailsTitle.setSpacingBefore(10);
        detailsTitle.setSpacingAfter(8);
        document.add(detailsTitle);

        document.add(new Paragraph("Name: " + userName, regularFont));
        document.add(new Paragraph("User ID: " + userId, regularFont));
        document.add(new Paragraph("Room Number: " + roomNo, regularFont));
        document.add(new Paragraph("Booking Price: " + price, regularFont));

        document.add(Chunk.NEWLINE);

        // Do's and Don'ts Section
        Paragraph rulesTitle = new Paragraph("DO’s and DON’Ts", sectionTitleFont);
        rulesTitle.setSpacingBefore(10);
        rulesTitle.setSpacingAfter(8);
        document.add(rulesTitle);

        Paragraph dos = new Paragraph("✔ DO’s:", subTitleFont);
        document.add(dos);
        List doList = new List(List.UNORDERED);
        doList.add(new ListItem("Carry valid government-issued photo ID during check-in.", regularFont));
        doList.add(new ListItem("Comply with all PG rules and curfews.", regularFont));
        doList.add(new ListItem("Maintain cleanliness in personal and shared spaces.", regularFont));
        doList.add(new ListItem("Report any maintenance issues to management promptly.", regularFont));
        doList.add(new ListItem("Respect other tenants’ privacy and space.", regularFont));
        document.add(doList);

        document.add(Chunk.NEWLINE);

        Paragraph donts = new Paragraph("✘ DON’Ts:", subTitleFont);
        document.add(donts);
        List dontList = new List(List.UNORDERED);
        dontList.add(new ListItem("Do not engage in illegal or disruptive activities within the premises.", regularFont));
        dontList.add(new ListItem("Avoid tampering with electrical, fire, or safety systems.", regularFont));
        dontList.add(new ListItem("Sub-letting the room is strictly prohibited.", regularFont));
        dontList.add(new ListItem("Loud music or parties are not allowed without prior permission.", regularFont));
        document.add(dontList);

        document.add(Chunk.NEWLINE);

        // Policies & Legal
        Paragraph policyTitle = new Paragraph("Policies & Legal Guidelines", sectionTitleFont);
        policyTitle.setSpacingBefore(10);
        policyTitle.setSpacingAfter(8);
        document.add(policyTitle);

        List policies = new List(List.UNORDERED);
        policies.add(new ListItem("Advance rent payment is non-refundable in case of early termination.", regularFont));
        policies.add(new ListItem("Any damage to property will be charged to the tenant.", regularFont));
        policies.add(new ListItem("Tenant must provide biometric verification at the time of check-in.", regularFont));
        policies.add(new ListItem("This contract is governed by the rental regulations applicable in the local jurisdiction.", regularFont));
        document.add(policies);

        document.add(Chunk.NEWLINE);

        // Final Note
        Paragraph finalNote = new Paragraph("Please keep a printed copy of this contract. Verification of identity and document submission will be done at the time of possession.", italicFont);
        finalNote.setSpacingBefore(10);
        finalNote.setSpacingAfter(20);
        document.add(finalNote);

        // Signature fields
        Paragraph signatureLine = new Paragraph("Tenant Signature: ___________________________", regularFont);
        signatureLine.setSpacingBefore(30);
        document.add(signatureLine);

        Paragraph dateLine = new Paragraph("Date: _______________", regularFont);
        dateLine.setSpacingBefore(10);
        document.add(dateLine);

        Paragraph authoritySign = new Paragraph("Authorized Signature (PGVaale): ___________________________", regularFont);
        authoritySign.setSpacingBefore(20);
        document.add(authoritySign);

        document.close();

    } catch (Exception e) {
        e.printStackTrace();
    }

    return new ByteArrayInputStream(out.toByteArray());
}

}
