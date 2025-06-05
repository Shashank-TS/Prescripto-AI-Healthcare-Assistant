package com.hms.hospital_management_service.Config;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.hms.hospital_management_service.Model.Role;
import com.hms.hospital_management_service.Model.User;


public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(User user){
        this.username=user.getUsername();
        this.password=user.getPassword();
        this.authorities=MapRolesToAuthorities(user.getRoles());
    }

    private Collection<? extends GrantedAuthority> MapRolesToAuthorities(Set<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.name())).collect(Collectors.toSet());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
    
}
