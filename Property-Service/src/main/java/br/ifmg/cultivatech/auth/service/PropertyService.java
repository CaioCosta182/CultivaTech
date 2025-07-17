package br.ifmg.cultivatech.auth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import br.ifmg.cultivatech.auth.model.Property;
import br.ifmg.cultivatech.auth.repository.PropertyRepository;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    public Property createProperty(Property property, User owner) {
        property.setOwner(owner);
        return propertyRepository.save(property);
    }
}