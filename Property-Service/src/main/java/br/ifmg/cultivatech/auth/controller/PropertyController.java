package br.ifmg.cultivatech.auth.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.ifmg.cultivatech.auth.model.Property;
import br.ifmg.cultivatech.auth.service.PropertyService;

@RestController

@RequestMapping("/api/properties")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @PostMapping
    public ResponseEntity<Property> createProperty(
        @RequestBody Property property,
        @AuthenticationPrincipal User owner
    ) {
        return ResponseEntity.ok(propertyService.createProperty(property, owner));
    }
}