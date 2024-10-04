package org.example.backendlibrary;

import lombok.With;

import java.util.UUID;
@With
public record BookLibraryDTO(UUID id,  String title, String author, String image) {
}
