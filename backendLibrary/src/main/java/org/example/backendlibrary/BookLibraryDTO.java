package org.example.backendlibrary;

import java.util.UUID;

public record BookLibraryDTO(UUID id,  String title, String author, String image) {
}
